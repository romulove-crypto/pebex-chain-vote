import { useState } from "react";
import { VoteProposalForm } from "@/components/VoteProposalForm";
import { CsvUploader } from "@/components/CsvUploader";
import { AddressPreview } from "@/components/AddressPreview";
import { SendVoteSection } from "@/components/SendVoteSection";
import { toast } from "sonner";
import pebexLogo from "@/assets/pebex-logo.png";

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
            <img 
              src={pebexLogo} 
              alt="Pebex Logo" 
              className="w-[86px] h-[86px] object-contain"
            />
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
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground space-y-3">
          <p>Built on Sui Network • Powered by Move</p>
          <div className="flex items-center justify-center gap-2">
            <span>Developed by Romulove</span>
            <a 
              href="https://br.linkedin.com/in/r%C3%B4mulo-monteiro-santos-35595a30" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              aria-label="LinkedIn Profile"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect width="4" height="12" x="2" y="9"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <a 
              href="https://github.com/romulove" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              aria-label="GitHub Profile"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                <path d="M9 18c-4.51 2-5-2-7-2"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
