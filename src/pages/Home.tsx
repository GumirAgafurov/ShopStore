import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export function Home() {
    return <div>
      <h1>Home</h1>
      <Link to="/store">
        <Button>Перейти в магазин</Button>
      </Link>
    </div>
}
