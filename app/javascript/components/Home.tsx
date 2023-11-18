import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <div>
    <div>
      <div>
        <h1>PokePortal</h1>
        <p>
          A central hub for all of your Pokemon needs.
        </p>
        <hr/>
        <Link
          to="/battles"
          role="button"
        >
          Battles
        </Link>
      </div>
    </div>
  </div>
);