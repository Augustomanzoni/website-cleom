export const FORMSPREE_FORM_ID = "xwlkyqzv";
export const FORMSPREE_ENDPOINT = `https://formspree.io/f/${FORMSPREE_FORM_ID}`;

export type FormspreeResult = { ok: true } | { ok: false; message?: string };

export async function submitToFormspree(payload: Record<string, string>): Promise<FormspreeResult> {
  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) return { ok: true };

    const data = (await response.json().catch(() => null)) as
      | { errors?: { message?: string }[] }
      | null;
    return { ok: false, message: data?.errors?.[0]?.message };
  } catch {
    return { ok: false };
  }
}
