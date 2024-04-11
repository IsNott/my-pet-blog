import LoginForm from "@/app/ui/common/login-form";
import { Heading } from "@radix-ui/themes";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div
          style={{ background: "rgb(62 64 67)" }}
          className="flex h-20 w-full items-end rounded-lg p-3 md:h-36"
        >
          <div className="w-32 text-white md:w-36">
            <Heading>Little Dog Book</Heading>
          </div>
        </div>
        <LoginForm />
        <h3>don't have accout yet? Check to Signup</h3>
      </div>
    </main>
  );
}
