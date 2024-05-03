/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { text_font, title_font } from "~/fonts";
import SignInButton from "./sign-in-button";
import classNames from "classnames";

export default function HomePage() {
  return (
    <div className="col-fs-c z-1 relative h-screen w-screen">
      <div
        className="col-fs-c h-[420px] w-full px-4"
        style={{
          background: "linear-gradient(180deg, white 0%, #8b9dc350 100%)",
        }}
      >
        <div className="row-sb-c w-[1080px] max-w-full rounded-[0_0_5px_5px] bg-fb-blue pb-2 pl-4 pr-4 pt-4">
          <span
            className={classNames([
              title_font.className,
              "text-3xl font-bold text-white",
            ])}
          >
            farbook
          </span>
          <div className="row-fs-c gap-3">
            <div className="h-7 w-24 cursor-not-allowed rounded-sm border-[1px] border-fb-dgrey bg-white" />
            <div className="h-7 w-24 cursor-not-allowed rounded-sm border-[1px] border-fb-dgrey bg-white" />
            <SignInButton className="col-c-c h-7 rounded-sm border-[1px] border-fb-dgrey bg-[#ffffff10] px-3 text-xs font-bold text-white">
              Login
            </SignInButton>
          </div>
        </div>
        <div className="grid h-full w-[1080px] max-w-full grid-cols-2 pt-8">
          <div className="col w-full gap-4 px-4 py-6">
            <span
              className={classNames([
                "text-xl font-bold text-fb-dgrey",
                text_font.className,
              ])}
            >
              Farbook helps you connect and share with the farcasters in your
              life.
            </span>
            <img src="/connecting.png" />
          </div>
          <div
            className={classNames([
              "col h-full w-full px-4 py-6 text-fb-dgrey",
              text_font.className,
            ])}
          >
            <span className="text-xl font-bold">Sign up / in</span>
            <span className="text-lg">
              It&apos;s free and anyone on Farcaster can join
            </span>
            <div className="h-4" />
            <SignInButton
              className="h-7 rounded-sm bg-fb-green px-3 text-xs font-bold text-white"
              style={{ boxShadow: "inset 0 0 2px #00000050" }}
            >
              Sign In with Farcaster
            </SignInButton>
            <div className="h-4" />
            <span className="text-xs">
              By clicking Sign In, you are agreeing to nothing. This is not a
              real company and we are not copying any product in particular.
              Please don&apos;t sue us.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
