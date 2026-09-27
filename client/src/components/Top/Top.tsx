import React from "react";
import styles from "./Top.module.css";
import Logo from "../Logo/Logo";

const Top = () => {
  return (
    <div className={styles.top}>
      <Logo></Logo>

      <div className={styles.imagePosition}>
        <div className={styles.image}></div>
      </div>

      <div className={styles.textContainer}>
        <div className={styles.headerContainer}>
          <div className={styles.header}>Sign in to </div>
          <div className={styles.subHeader}>Lorem Ipsum is simply </div>
        </div>

        <div className={styles.text}>
          Lorem ipsum dolor sit amet consectetur. At tortor imperdiet nisl
          hendrerit arcu iaculis. Id convallis adipiscing mauris non urna
          imperdiet odio viverra. Est turpis tortor a elit orci risus et. Ut
          penatibus est sodales tempor nec. Pulvinar integer mauris odio
          ullamcorper. Aliquet pretium leo ut lorem tempus venenatis mattis in.
          Fermentum vitae diam accumsan maecenas orci urna fusce facilisis.
          Iaculis nullam volutpat diam suspendisse congue nec massa. Nulla
          varius turpis elementum donec massa cras risus. Neque vitae id ut
          vitae. Luctus suscipit interdum hac ultricies lorem pellentesque. Quam
          phasellus augue vel est hendrerit quis at aliquam. Tortor laoreet
          vitae vitae vitae pulvinar amet augue.
        </div>
      </div>
    </div>
  );
};

export default Top;
