import { InvoiceLine, Invoice as PrismaInvoice } from "@prisma/client";

export interface Invoice extends PrismaInvoice {
    lines: InvoiceLine[];
}

export interface Totals {
    totalHT: number;
    totalVAT: number;
    totalTTC: number;
}