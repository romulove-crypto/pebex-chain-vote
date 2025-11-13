import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Users } from "lucide-react";

interface AddressPreviewProps {
  addresses: string[];
}

export function AddressPreview({ addresses }: AddressPreviewProps) {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Eye className="h-6 w-6 text-primary" />
          Preview
        </CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span className="font-semibold text-primary">{addresses.length}</span> voters loaded
        </CardDescription>
      </CardHeader>
      <CardContent>
        {addresses.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No addresses loaded yet
          </div>
        ) : (
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="max-h-[300px] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-20">#</TableHead>
                    <TableHead>Wallet Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {addresses.map((address, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium text-muted-foreground">
                        {index + 1}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {address}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
