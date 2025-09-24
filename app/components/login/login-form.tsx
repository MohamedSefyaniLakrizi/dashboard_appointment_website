"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import Image from "next/image";
import GoogleIcon from "./google-icon";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const connectToGoogle = () => {};
  return (
    <div className={cn("flex flex-col gap-6 w-96 mx-3", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Connexion à votre compte</CardTitle>
          <CardDescription>
            Connectez-vous avec votre compte Google
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <Button
                  variant="outline"
                  className="w-full cursor-pointer"
                  onClick={() => connectToGoogle()}
                >
                  <GoogleIcon />
                  Se connecter avec Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Problème de connexion? Contactez{" "}
              <a
                href="mailto:mohamedsefyani@gmail.com"
                className="underline underline-offset-4"
              >
                l&apos;administrateur du site.
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
