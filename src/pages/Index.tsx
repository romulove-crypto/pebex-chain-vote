import { useState } from "react";
import { VoteProposalForm } from "@/components/VoteProposalForm";
import { CsvUploader } from "@/components/CsvUploader";
import { AddressPreview } from "@/components/AddressPreview";
import { SendVoteSection } from "@/components/SendVoteSection";
import { toast } from "sonner";
import { Vote } from "lucide-react";

const Index = () => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [addresses, setAddresses] = useState<string[]>([]);

  const handleSendVote = async () => {
    try {
      // TODO: Implement Move smart contract integration
      toast.success("Vote proposal sent successfully!", {
        description: `Sent to ${addresses.length} voters`,
      });
      
      // Reset form
      setSubject("");
      setDescription("");
      setAddresses([]);
    } catch (error) {
      toast.error("Failed to send vote proposal");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20">
              <Vote className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Pebex Vote Governance</h1>
              <p className="text-sm text-muted-foreground">Decentralized voting on Sui blockchain</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          <VoteProposalForm
            subject={subject}
            description={description}
            onSubjectChange={setSubject}
            onDescriptionChange={setDescription}
          />

          <CsvUploader onAddressesLoaded={setAddresses} />

          <AddressPreview addresses={addresses} />

          <SendVoteSection
            subject={subject}
            description={description}
            addresses={addresses}
            onSend={handleSendVote}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>Built on Sui Network • Powered by Move</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
