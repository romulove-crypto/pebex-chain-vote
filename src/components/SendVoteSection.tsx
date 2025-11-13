import { useCurrentAccount } from "@mysten/dapp-kit";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { WalletConnectButton } from "./WalletConnectButton";
import { toast } from "sonner";

interface SendVoteSectionProps {
  subject: string;
  description: string;
  addresses: string[];
  onSend: () => void;
}

export function SendVoteSection({
  subject,
  description,
  addresses,
  onSend,
}: SendVoteSectionProps) {
  const account = useCurrentAccount();

  const handleSend = () => {
    if (!subject.trim()) {
      toast.error("Please enter a vote subject");
      return;
    }
    if (!description.trim()) {
      toast.error("Please enter a vote description");
      return;
    }
    if (addresses.length === 0) {
      toast.error("Please upload voter addresses");
      return;
    }
    if (!account) {
      toast.error("Please connect your wallet");
      return;
    }

    onSend();
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Send className="h-6 w-6 text-primary" />
          Send Vote
        </CardTitle>
        <CardDescription>Submit your governance proposal to the blockchain</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <span className="text-sm text-muted-foreground">Wallet Status:</span>
          <WalletConnectButton />
        </div>

        <Button
          onClick={handleSend}
          disabled={!account || !subject || !description || addresses.length === 0}
          size="lg"
          className="w-full gap-2"
        >
          <Send className="h-5 w-5" />
          Send Governance Vote
        </Button>
      </CardContent>
    </Card>
  );
}
