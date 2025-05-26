import { useParams } from "react-router";
import useAccountById from "~/features/accounts/hooks/useAccountById";

export default function Account() {
  const { id } = useParams();

  const { data: account } = useAccountById(id as string);

  console.log(account);

  return <>Hi, I am your account! {account?.name}</>;
}
