import { Invoice } from "@/type";
import { Plus } from "lucide-react";
import React from "react";

interface Props {
  invoice: Invoice;
  setInvoice: (invoice: Invoice) => void;
}

const InvoiceLines: React.FC<Props> = ({ invoice, setInvoice }) => {

  return (
    <div className="h-fit bg-base-200 p-5 rounded-xl w-full">
        <div className="flex justify-between items-center mb-4">
            <h2 className="badge badge-accent">Produits / Services</h2>
            <button className="btn btn-sm btn-accent">
                <Plus className="w-4" />
            </button>
        </div>

        <div className="scrollable">
            <table className="table w-full">
                <thead>
                    <th>Quantite</th>
                    <th>Description</th>
                    <th>Prix Unitaire (HT)</th>
                    <th>Montant (HT)</th>
                    <th></th>
                </thead>
            </table>
        </div>
    </div>
  );
};

export default InvoiceLines;
