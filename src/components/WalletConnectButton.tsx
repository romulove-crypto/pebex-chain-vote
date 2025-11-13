import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { Button } from "@/components/ui/button";
import { Wallet, CheckCircle } from "lucide-react";

export function WalletConnectButton() {
  const account = useCurrentAccount();

  if (account) {
    return (
      <Button variant="secondary" size="lg" className="gap-2">
        <CheckCircle className="h-5 w-5 text-primary" />
        {account.address.slice(0, 6)}...{account.address.slice(-4)}
      </Button>
    );
  }

  return (
    <ConnectButton
      connectText={
        <Button variant="default" size="lg" className="gap-2">
          <Wallet className="h-5 w-5" />
          Connect Wallet
        </Button>
      }
    />
  );
}
