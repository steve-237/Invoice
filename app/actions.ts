"use server";

import prisma from "@/lib/prisma";
import { randomBytes } from "crypto";

export async function checkAndAddUser(email: string) {
  if (!email) return;
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    const name = "";
    console.log(existingUser);

    if (!existingUser) {
      await prisma.user.create({
        data: {
          email,
          name
        },
      });
    }
  } catch (error) {
    console.error("Erreur Prisma:", error);
    throw new Error("Database connection failed");
  }
}

const generateUniqueId = async () => {
  let uniqueId;
  let isUnique = false;

  while (!isUnique) {
    uniqueId = randomBytes(3).toString("hex");
    const existingInvoice = await prisma.invoice.findUnique({
      where: {
        id: uniqueId,
      },
    });

    if (!existingInvoice) {
      isUnique = true;
    }
  }

  return uniqueId;
};

export async function createEmptyInvoice(email: string, name: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    const invoiceId = (await generateUniqueId()) as string;
    if (user) {
      const newInvoice = await prisma.invoice.create({
        data: {
          id: invoiceId,
          name: name,
          userId: user?.id,
          issuerName: "",
          issuerAddress: "",
          clientName: "",
          clientAddress: "",
          invoiceDate: "",
          dueDate: "",
          vatActive: false,
          vatRate: 20,
        },
      });
      return newInvoice;
    }
  } catch (error) {
    console.error(error);
  }
}


export async function getInvoicesByEmail(email: string) {
  if (!email) return;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include : {
        invoices : {
          include: {lines: true,}
        }
      }
    });

    
    if(user) {
      const today = new Date();
      const updatedInvoices = await Promise.all(
        user.invoices.map( async (invoice) => {
          const dueDate = new Date(invoice.dueDate);
          if(dueDate < today && invoice.status == 2) {
            const updatedInvoice = await prisma.invoice.update({
              where: {id: invoice.id},
              data: {status: 5},
              include: {lines: true}
            })
            return updatedInvoice
          }
          return invoice
        })
      )
      return updatedInvoices;
    }

  } catch (error) {
    console.error(error);
  }
}