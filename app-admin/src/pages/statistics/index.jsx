import { useRef } from 'react';
import { message } from 'antd';
import styles from './index.less';

export default function IndexPage() {

  const handleClick = (e) => {
    if(e.target && e.target.nodeName.toLowerCase() === 'li'){
      message.success(e.target.innerHTML);
    }
  }

  return (
    <div className={styles.statistics}>
        <ul onClick={handleClick}>
          {
            (() => {
              let lis = [];
              for(let i=0; i<100; i++){
                lis.push(<li key={i}>{i}</li>);
              }
              return lis;
            })()
          }
        </ul>
    </div>
  );
}
