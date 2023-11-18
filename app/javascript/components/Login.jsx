import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { MainHeader } from "./helpers/main-header";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username can't be empty!",
  }),
  password: z.string().min(2, {
    message: "Password can't be empty!",
  }),
});

export default function Login() {
  const [error, setError] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values) {
    const requestBody = {
      user: { username: values.username, password: values.password },
    };
    fetch("/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    }).then((response) => {
      if (!response.ok) {
        setError(true);
        return;
      }
      setError(false);
      console.log("Success!");
    });
  }

  return (
    <div className="h-screen">
      <MainHeader />
      <div className="flex flex-1 h-5/6 items-center">
        <div className="mx-auto flex w-120 flex-col justify-center space-y-6">
          <div className="flex flex-col space-y-2 text-left">
            <h1 className="text-3xl font-semibold tracking-right">Login</h1>
            <p className="text-sm text-muted-foreground">
              Please login to access the rest of PokePortal
            </p>
            <Form {...form} className="flex flex-1 items-start">
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Continue</Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
