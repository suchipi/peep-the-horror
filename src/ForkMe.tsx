import React from "react";

export default function ForkMe() {
  return (
    <>
      <a
        href="https://github.com/suchipi/peep-the-horror"
        style={{ position: "fixed", top: "0", right: "0" }}
        target="_blank"
      >
        <img
          loading="lazy"
          width="149"
          height="149"
          src="https://github.blog/wp-content/uploads/2008/12/forkme_right_darkblue_121621.png?resize=149%2C149"
          className="attachment-full size-full"
          alt="Fork me on GitHub"
          data-recalc-dims="1"
        />
      </a>
    </>
  );
}
