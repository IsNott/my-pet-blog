"use server";
import { signIn } from "../../auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import pool from "../public/db";
import { User } from "./dataDefinition";
import { RegisterState, LogState, State } from "./dataDefinition";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";


const PlogFormSchema = z.object({
  senderId: z.string(),
  title: z.string().min(6, { message: "Please enter title over 6 word." }),
  context: z.string().min(6, { message: "Please enter Context over 6 word." }),
  imgs: z.string().min(32, { message: "Please upload last 1 picture." }),
});

const LogupFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

type userEmail = {
  email: string;
};

const CreatPlog = PlogFormSchema.omit({});

// 登录
export async function authenticate(
  pervState: LogState | undefined,
  formData: FormData,
): Promise<LogState> {
  try {
    const user: User = await signIn("credentials", formData);
    return {
      success: true,
      errorMsg: null,
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            errorMsg: "Invalid credentials.",
            success: false,
          };
        default:
          return {
            errorMsg: "Something went wrong.",
            success: false,
          };
      }
    }
    throw error;
  }
}

// 注册
export async function register(
  pervState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  let connect = null;
  try {
    const validateFields = LogupFormSchema.omit({}).safeParse({
      name: formData.get("name"),
      password: formData.get("password"),
      email: formData.get("email"),
    });
    if (!validateFields.success) {
      return {
        errors: validateFields.error.flatten().fieldErrors,
        errorMsg: "Field vaild fail.",
        success: false,
      };
    }
    const id = uuidv4();
    const email = validateFields.data.email;
    const name = validateFields.data.name;
    const password = await bcrypt.hash(validateFields.data.password, 10);
    connect = await pool.getConnection();
    const [rows] = await connect.query(
      `select email from users where email = '${email}'`,
    );
    let userEmails: userEmail[] = rows as userEmail[];
    if (userEmails?.length > 0) {
      return {
        errors: { email: ["Email has been used."] },
        errorMsg: "Email vaild fail.",
        success: false,
      };
    } else {
      connect.execute(
        `insert into users(id,name,email,password) values('${id}','${name}','${email}','${password}')`,
      );
    }
  } catch (error) {
    console.log("register error:{}", error);
    return {
      errorMsg: "Something went wrong.",
      success: false,
    };
  } finally {
    connect === null ? "" : connect.release();
  }
  // 清除这个路由下的缓存
  revalidatePath("/log");
  return {
    errorMsg: null,
    success: true,
  };
}

export async function doNewPost(
  pervState: State,
  formData: FormData,
): Promise<State> {
  try {
    const validateFields = CreatPlog.safeParse({
      senderId: formData.get("senderId"),
      title: formData.get("title"),
      context: formData.get("context"),
      imgs: formData.get("imgs"),
    });
    if (!validateFields.success) {
      return {
        errors: validateFields.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to Create Plog.",
      };
    }
    const id = uuidv4();
    const createTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
    const tags = "";
    const connect = await pool.getConnection();
    await connect.execute(
      `insert into blog(id,title,context,create_time,poster_id,img_urls,tags) VALUES('${id}','${validateFields.data.title}','${validateFields.data.context}','${createTime}','${validateFields.data.senderId}','${validateFields.data.imgs}','${tags}')`,
    );
    connect.release();
    return {
      success: true,
    };
  } catch (error) {
    console.error("create new post error:", error);
    return {
      errors: { create: "create error" },
      message: "doPost failed something wrong",
    };
  }
}

export async function uploadFile(formData: FormData) {
  const uploadPath: string | undefined = process.env.UPLOAD_PATH;
  if (!formData.get("file")) {
    return null;
  }
  try {
    const res = await fetch(uploadPath || "", {
      method: "POST",
      body: formData,
    });
    const resp = await res.json();
    // return resp
    if (resp.code !== 200) {
      throw new Error(resp.msg || "fetch upload file failed");
    } else {
      return resp;
    }
  } catch (error) {
    throw error;
  }
}

export async function getFilePreView(id: string[]) {
  const perviewPath: string | undefined = process.env.PERVIEW_PATH;
  try {
    const url = perviewPath;
    const res = await fetch(url || "", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    });
    const resp = await res.json();

    if (resp.code !== 200) {
      throw new Error(resp.msg || "fetch upload file failed");
    } else {
      return resp.obj;
    }
  } catch (error) {
    throw error;
  }
}
