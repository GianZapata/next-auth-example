
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function Home() {

  const session = await auth()


  if(!session || !session.accessToken ) return redirect('/auth/login')

  return (
    <main>
      <h1>Privado</h1>
      <pre>
        { JSON.stringify( session.user, null, 2 ) }
      </pre>
    </main>
  );
}
