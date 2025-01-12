"use client";

import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { SubmitButton } from "./submit-button";
import { initiatePaymentAction } from "@/app/actions";

export default function CreatePayment() {
  return (
    <form className="w-[400px] border p-8 rounded-xl">
      <div className="flex flex-col my-4 gap-2">
        <Label htmlFor="title">Title</Label>
        <Input type="text" name="title" placeholder="Give a title" required />
      </div>
      <div className="flex flex-col my-4 gap-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          type="number"
          name="amount"
          placeholder="Give an amount"
          required
        />
      </div>
      <SubmitButton
        pendingText="Creating..."
        formAction={initiatePaymentAction}
      >
        Create
      </SubmitButton>
    </form>
  );
}
