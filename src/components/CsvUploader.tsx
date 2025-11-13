import { useRef } from "react";
import Papa from "papaparse";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileUp } from "lucide-react";
import { toast } from "sonner";

interface CsvUploaderProps {
  onAddressesLoaded: (addresses: string[]) => void;
}

export function CsvUploader({ onAddressesLoaded }: CsvUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".csv")) {
      toast.error("Please upload a CSV file");
      return;
    }

    Papa.parse(file, {
      complete: (results) => {
        const addresses: string[] = [];
        
        results.data.forEach((row: any) => {
          if (Array.isArray(row) && row[0]) {
            const address = row[0].trim();
            if (address && address.startsWith("0x")) {
              addresses.push(address);
            }
          }
        });

        if (addresses.length === 0) {
          toast.error("No valid addresses found in CSV");
          return;
        }

        onAddressesLoaded(addresses);
        toast.success(`Loaded ${addresses.length} addresses`);
      },
      error: (error) => {
        toast.error(`Error parsing CSV: ${error.message}`);
      },
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <FileUp className="h-6 w-6 text-primary" />
          Load Voters
        </CardTitle>
        <CardDescription>Upload CSV with wallet addresses</CardDescription>
      </CardHeader>
      <CardContent>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="hidden"
        />
        <Button
          onClick={() => fileInputRef.current?.click()}
          variant="secondary"
          size="lg"
          className="w-full gap-2"
        >
          <Upload className="h-5 w-5" />
          Choose CSV File
        </Button>
        <p className="text-sm text-muted-foreground mt-3">
          Expected format: One wallet address per row (0x...)
        </p>
      </CardContent>
    </Card>
  );
}
