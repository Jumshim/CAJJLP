import React, { useContext } from "react";
import { Separator } from "../ui/separator";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Settings from "./Settings";
import { Textarea } from "../ui/textarea";
import { Avatar, AvatarImage } from "../ui/avatar";
import { toast } from "../ui/use-toast";

const profileFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username can't be empty!",
  }),
  password: z.string().min(2, {
    message: "Password can't be empty!",
  }),
  bio: z.string().max(160).min(0).optional(),
  profile_pic: z.string().max(160).min(2).optional(),
});

const defaultValues = {
  username: "Test Username",
  bio: "Test biography",
  password: "",
  profile_pic:
    "https://i.pinimg.com/originals/09/da/92/09da926c2b94d95008a9e3b2f60bfdd3.png",
};

export function ProfileForm() {
  const { token, logout } = useContext(AuthContext);
  const form = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  /** TODO establish link with the backend */

  function onSubmit(values) {
    console.log("on submit triggered");
    const requestBody = {
      user: {
        username: values.username,
        password: values.password,
        bio: values.bio,
        profile_pic: values.profile_pic,
      },
    };

    fetch("/user/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          return;
        }
        console.log("UPDATING!");
        toast({
          title:
            "You've successfully updated your profile to the following values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(data, null, 2)}
              </code>
            </pre>
          ),
        });
      })
      .then(navigate("/settings/profile"));
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="profile_pic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Picture URL</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <Avatar>
                <AvatarImage src={field.value || defaultValues.profile_pic} />
              </Avatar>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder={defaultValues.username} {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or
                chosen in game name.
              </FormDescription>
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
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={defaultValues.bio}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update Profile</Button>
      </form>
    </Form>
  );
}

export default function Profile() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  );
}
