import { NextApiRequest, NextApiResponse } from "next";
import { Types } from "mongoose";
import { Table } from "@/lib/models/tableModel";
import { connectDb } from "@/lib/connectMongodb";

export default async function editData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, admin, listing, status } = req.body;

  if (!id || !admin || !listing || !status) {
    return res.status(400).json({ message: "Bad request" });
  }

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }

  try {
    await connectDb();

    const row = await Table.findById(id);
    if (!row) {
      return res.status(404).json({ message: "Not found" });
    }

    const obj = {
      listing,
      status,
      history: row.history,
    };

    if (row.status !== status) {
      obj.history.push({ user: admin, action: status });
    }

    const newObj = await Table.findByIdAndUpdate(id, obj, {
      new: true,
    });

    return res.status(200).json(newObj);
  } catch (error) {
    return res.status(500).json({ message: "Server error occurred" });
  }
}
