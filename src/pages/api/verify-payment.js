import crypto from "crypto";
import supabase from "../../lib/supabase";

export default async function handler(req, res) {

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    orderData,
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json({ success: false });
  }

  // ✅ Save order in DB
  const { error } = await supabase.from("orders").insert([
    {
      ...orderData,
      payment_id: razorpay_payment_id,
    },
  ]);

  if (error) {
    return res.status(500).json({ error });
  }

  res.status(200).json({ success: true });
}