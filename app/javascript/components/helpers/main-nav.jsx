import React from "react";

import { Link } from "react-router-dom";

/** Created the Navigation skeleton for reuse in future pages. */
export function MainNav() {
  return (
    <nav className="flex items-center space-x-6 lg:space-x-8">
      <Link
        to="/battle"
        className="text-base font-medium transition-colors hover:text-primary"
      >
        Battle
      </Link>
      <Link
        to="/forum"
        className="text-base font-medium transition-colors hover:text-primary"
      >
        Forum
      </Link>
      <Link
        to="/news"
        className="text-base font-medium transition-colors hover:text-primary"
      >
        News
      </Link>
      <Link
        to="/pokedex"
        className="text-base font-medium transition-colors hover:text-primary"
      >
        Pokedex
      </Link>
    </nav>
  );
}
