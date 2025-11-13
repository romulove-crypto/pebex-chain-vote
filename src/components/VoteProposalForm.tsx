import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileText, MessageSquare } from "lucide-react";

interface VoteProposalFormProps {
  subject: string;
  description: string;
  onSubjectChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
}

export function VoteProposalForm({
  subject,
  description,
  onSubjectChange,
  onDescriptionChange,
}: VoteProposalFormProps) {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <MessageSquare className="h-6 w-6 text-primary" />
          Vote Proposal
        </CardTitle>
        <CardDescription>Create your governance vote proposal</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="subject" className="text-foreground">
            Subject
          </Label>
          <Input
            id="subject"
            placeholder="Enter the vote subject..."
            value={subject}
            onChange={(e) => onSubjectChange(e.target.value)}
            className="bg-input border-border"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description" className="text-foreground">
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="Describe the proposal in detail..."
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            className="bg-input border-border min-h-[120px]"
          />
        </div>
      </CardContent>
    </Card>
  );
}
