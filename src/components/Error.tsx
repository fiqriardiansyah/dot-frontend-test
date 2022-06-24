type Props = {
    message: string
}

function Index({ message }: Props) {
  return (
    <div className="error">
      <p>{message}</p>
    </div>
  );
}

export default Index;
