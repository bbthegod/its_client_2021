/*
 *
 * NotFoundPage
 *
 */
import classes from './styles.module.css';

export default function NotFoundPage() {
  return (
    <div className={classes.root}>
      <div>
        <h1 className={classes.h1Class}>
          4<span className={classes.spanClass} />4
        </h1>
      </div>
      <h2 className={classes.h2Class}>Oops! Page Not Be Found</h2>
      <p className={classes.pClass}>Sorry but the page you are looking for does not exist</p>
    </div>
  );
}
