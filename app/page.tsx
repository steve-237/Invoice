"use client";

import { Layers } from "lucide-react";
import Wrapper from "./components/Wrapper";
import { useEffect, useState } from "react";
import { createEmptyInvoice } from "./actions";
import { useUser } from "@clerk/nextjs";
import confetti from "canvas-confetti";

export default function Home() {
  const { user } = useUser();
  const [invoiceName, setInvoiceName] = useState("");
  const [isNameValid, setIsNameValid] = useState(true);
  const email = user?.primaryEmailAddress?.emailAddress as string;

  useEffect(() => {
    setIsNameValid(invoiceName.length <= 60);
  }, [invoiceName]);

  const handleCreateInvoice = async () => {
    try {
      if (email) {
        await createEmptyInvoice(email, invoiceName);
      }

      setInvoiceName("");
      const modal = document.getElementById('my_modal_3') as HTMLDialogElement;
      if(modal) modal.close();

      confetti({
        particleCount: 100,
        spread: 70,
        origin: {y: 0.6},
        zIndex:9999
      })

    } catch (error) {
      console.error("Erreur lors de la creation de la factue :", error);
    }
  };

  return (
    <Wrapper>
      <div className="flex flex-col space-y-4">
        <h1 className="text-g font-bold">Mes factures</h1>

        <div className="grid md:grid-cols-3 gap-4">
          <div
            className="cursor-pointer border border-accent rounded-xl flex justify-center items-center flex-col p-5"
            onClick={() =>
              (
                document.getElementById("my_modal_3") as HTMLDialogElement
              ).showModal()
            }
          >
            <div className="font-bold text-accent">Creer une facture</div>
            <div className="bg-accent-content text-accent rounded-full p-2 mt-2">
              <Layers className="h-6 w-6" />
            </div>
          </div>

          {/*Liste des factures*/}
        </div>

        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>

            <h3 className="font-bold text-lg">Nouvelle Facture</h3>

            <input
              type="text"
              placeholder="Nom de la facture (max 60 caracteres)"
              className="input input-bordered w-full my-4"
              value={invoiceName}
              onChange={(e) => setInvoiceName(e.target.value)}
            />

            {!isNameValid && (
              <p className="mb-4 text-sm">
                Le nom ne peut pas depasser 60 caracteres.
              </p>
            )}

            <button
              className="btn btn-accent"
              disabled={!isNameValid || invoiceName.length === 0}
              onClick={handleCreateInvoice}
            >Creer</button>
          </div>
        </dialog>
      </div>
    </Wrapper>
  );
}
