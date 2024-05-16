import { CloseOutlined } from '@ant-design/icons';
import CountUp from 'react-countup';

interface ICardProps {
  total: number;
  title: string;
}

const Card = (props: ICardProps) => {
  return (
    <div className='flex items-center justify-start gap-4 rounded bg-red-100 p-5 shadow-sm'>
      <span className='text-[32px] font-bold'>{props.title}</span>

      <CountUp start={0} end={props.total} delay={0}>
        {({ countUpRef }) => <span className='text-4xl font-bold' ref={countUpRef} />}
      </CountUp>

      <CloseOutlined className='text-[30px]' />
    </div>
  );
};

export default Card;
