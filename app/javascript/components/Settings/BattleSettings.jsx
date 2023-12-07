import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
import { AuthContext } from "../AuthProvider";
import { Toaster } from "../ui/toaster";
import {
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
  Card,
  CardFooter,
} from "../ui/card";

export function BattleSettingCard({ battle, token }) {
  function deleteBattle() {
    fetch(`/battles/${battle.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error in deleting user");
        }
        return response.json();
      })
      .then(() => {
        navigate("/settings/battles");
      });
  }

  //updating the battle function 
  function updateBattle(values) {
    const requestBody = {
      battle: {
        title: "TEST",
        description: "TEST",
        battle_type: "DOUBLES",
        date: "12-31-2023",
      },
    };

    fetch(`/battles/${battle.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        //handling errors in updating the battle 
        if (!response.ok) {
          throw new Error("Error in updating battle");
        }
        return response.json();
    })
    .then((data) => {
      //set the battle with the new battle data 
      setBattles(data);
      console.log("Battle successfully updated"); 
    })
    .catch((error) => {
      // Handle errors during the update process
      console.error("Error updating battle:", error.message);
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{battle.title}</CardTitle>
        <CardDescription>{battle.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          {battle.username} wants to play a {battle.battle_type} match at:
        </p>
        <p>{battle.date}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={deleteBattle} variant="destructive">
          Delete Battle
        </Button>
        <Button onClick={updateBattle} >
          Update Battle
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function BattleSetting() {
  const { token } = useContext(AuthContext);
  const [battles, setBattles] = useState([]);

  useEffect(() => {
    getBattles();
  }, []);

  function getBattles() {
    fetch("/user_battles", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.log("ERROR");
          return;
        }
        return response.json();
      })
      .then((data) => {
        setBattles(data);
      });
  }

  return (
    <div className="space-y-6 h-full">
      <div>
        <h3 className="text-lg font-medium">Battles</h3>
        <p className="text-sm text-muted-foreground">
          Here are all of your Battle Postings:
        </p>
        {battles.map((battle) => {
          return <BattleSettingCard battle={battle} token={token} />;
        })}
      </div>
      <Separator />
    </div>
  );
}
