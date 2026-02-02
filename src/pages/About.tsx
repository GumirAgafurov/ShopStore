import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export function About() {
    return <div>
      <h1>About</h1>
      <Link to="/store">
        <Button>Перейти в магазин</Button>
      </Link>
    </div>
}
