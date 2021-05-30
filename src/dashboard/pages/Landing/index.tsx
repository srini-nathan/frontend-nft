import WalletDisplay from '../../components/WalletDisplay';
import style from './Landing.module.scss';

export const Landing = () => {
    return <div className={style.container}>
<div className={style.connect}>
    <WalletDisplay/>
</div>
    </div>
        
    
}