"use client";
import { getInvoiceById } from "@/app/actions";
import InvoiceInfo from "@/app/components/invoiceInfo";
import InvoiceLines from "@/app/components/InvoiceLines";
import VATControl from "@/app/components/VATControl";
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

  if(!invoice) return (
    <div className="flex justify-center items-center h-screen w-full">
      <span className="font-bold">Facture Non Trouvee</span>
    </div>
  )

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
        <div className="flex flex-col md:flex-row w-full">
          <div className="flex w-full md:w-1/3 flex-col">
            <div className="mb-4 bg-base-200 rounded-xl p-5">
              <div className="flex justify-between items-center">
                <div className="badge badge-accent">Resume des Totaux</div>
                <VATControl invoice={invoice} setInvoice={setInvoice} />
              </div>
            </div>
            <InvoiceInfo invoice={invoice} setInvoice={setInvoice}/>
          </div>
          <div className="flex w-full md:w-2/3 flex-col md:ml-4">
              <InvoiceLines invoice={invoice} setInvoice={setInvoice} />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Page;
