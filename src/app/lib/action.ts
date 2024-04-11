"use server";
import { signIn } from "../../auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import pool from "../public/db";
import { User } from "./dataDefinition";
import { LoginState, State } from "./dataDefinition";

const PlogFormSchema = z.object({
  senderId: z.string(),
  title: z.string().min(6, { message: "Please enter title over 6 word." }),
  context: z.string().min(6, { message: "Please enter Context over 6 word." }),
  imgs: z.string().min(32, { message: "Please upload last 1 picture." }),
});

const CreatPlog = PlogFormSchema.omit({});

// 登录
export async function authenticate(
  pervState: LoginState | undefined,
  formData: FormData,
): Promise<LoginState> {
  try {
    const user: User = await signIn("credentials", formData);
    return {
      success: true,
      errorMsg: null,
      user: {
        username: user?.name,
        uid: user?.id,
      },
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            errorMsg: "Invalid credentials.",
            success: false,
            user: null,
          };
        default:
          return {
            errorMsg: "Something went wrong.",
            success: false,
            user: null,
          };
      }
    }
    throw error;
  }
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
    console.log("create new post error:", error);
    return {
      errors: { create: "create error" },
      message: "doPost failed something wrong",
    };
  }
}

export async function uploadFile(formData: FormData) {
  const uploadPath: any = process.env.UPLOAD_PATH;
  if (!formData.get("file")) {
    return null;
  }
  try {
    const res = await fetch(uploadPath, {
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
  const perviewPath: any = process.env.PERVIEW_PATH;
  try {
    const url = perviewPath;
    const res = await fetch(url, {
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
