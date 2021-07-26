import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
export default function Redirect(props: { message: string, to: string }) {
  const history = useHistory();
  useEffect(() => {
    setTimeout(() => {
      history.replace(props.to);
    }, 2000);
  });
  return <div>Redirecting to {props.to}... {props.message}</div>;
}
