"use client";
import { getInvoiceById } from "@/app/actions";
import Wrapper from "@/app/components/Wrapper";
import { Invoice } from "@/type";
import { Trash } from "lucide-react";
import React, { useEffect, useState } from "react";

const Page = ({ params }: { params: Promise<{ invoiceId: string }> }) => {
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [initialInvoice, setInitialInvoice] = useState<Invoice | null>(null);

  const fetchInvoice = async () => {
    try {
      const { invoiceId } = await params;
      const fetchedInvoice = await getInvoiceById(invoiceId);
      if (fetchedInvoice) {
        setInvoice(fetchedInvoice);
        setInitialInvoice(fetchedInvoice);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchInvoice();
  }, []);

  return (
    <Wrapper>
      <div>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
          <p className="badge badge-ghost badge-lg uppercase">
            <span>Facture-</span>
            {invoice?.id}
          </p>
          <div className="flex md:mt-0 mt-4">
            <select
              className="select select-sm select-bordered w-full"
              value={invoice?.status}
            >
              <option value={1}>Brouillon</option>
              <option value={2}>En attente</option>
              <option value={3}>Payee</option>
              <option value={4}>Annulee</option>
              <option value={5}>Impayee</option>
            </select>
            <button className="btn btn-sm btn-accent ml-4">Sauvegarder</button>
            <button className="btn btn-sm btn-accent ml-4">
              <Trash className="w-4" />
            </button>
          </div>
        </div>
        <div></div>
      </div>
    </Wrapper>
  );
};

export default Page;
