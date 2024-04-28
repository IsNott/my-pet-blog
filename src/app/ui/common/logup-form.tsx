"use client";
import { useFormState, useFormStatus } from "react-dom";
import { register } from "@/app/lib/action";
import { Button } from "@radix-ui/themes";
import { RegisterState } from "@/app/lib/dataDefinition";
import {
  EnvelopeClosedIcon,
  KeyboardIcon,
  LinkBreak1Icon,
  ArrowRightIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

const initState = {
  errorMsg: "",
  success: false,
} as RegisterState;

export default function LogupForm() {
  const [state, dispatch] = useFormState(register, initState);

  return (
    <>
      {state.success ? (
        <>
          <div
            style={{ background: "rgb(25 27 28)" }}
            className="flex-1 rounded-lg px-6 pb-4 pt-8"
          >
            <p className="my-8">Register success.</p>
            <Button className="m-8">
              <Link href={"/log"}>To LogIn</Link>
            </Button>
          </div>
        </>
      ) : (
        <form action={dispatch} className="space-y-3">
          <div
            style={{ background: "rgb(25 27 28)" }}
            className="flex-1 rounded-lg px-6 pb-4 pt-8"
          >
            <h1 className={`mb-3 text-2xl`}>Logup</h1>
            <div className="w-full ">
              <div>
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                  htmlFor="email"
                >
                  Name
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    required
                  />
                  <EnvelopeClosedIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
                {state.errors?.name &&
                  state.errors?.name.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
              <div>
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    required
                  />
                  <EnvelopeClosedIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
                {state.errors?.email &&
                  state.errors?.email.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
              <div className="mt-4">
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    required
                    minLength={6}
                  />
                  <KeyboardIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
                {state.errors?.password &&
                  state.errors?.password.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
            <LoginButton />
            <div
              className="flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              {!state.success && state.errorMsg && (
                <>
                  <LinkBreak1Icon className="h-5 w-5 text-red-500" />
                  <p className="text-sm text-red-500">{state.errorMsg}</p>
                </>
              )}
            </div>
          </div>
        </form>
      )}
    </>
  );
  function LoginButton() {
    const { pending } = useFormStatus();
    return (
      <Button mt="5" className="w-half" aria-disabled={pending}>
        Register <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
      </Button>
    );
  }
}
