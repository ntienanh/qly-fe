// MenuData
const menuData = [
  {
    id: 1,
    title: 'Home',
    children: [],
  },
  {
    id: 2,
    title: 'About',
    children: [
      {
        id: 3,
        title: 'Company',
        children: [
          { id: 4, title: 'History', children: [] },
          { id: 5, title: 'Mission', children: [] },
        ],
      },
      { id: 6, title: 'Team', children: [] },
    ],
  },
  {
    id: 7,
    title: 'Contact',
    children: [],
  },
];

const Product = () => {
  const MenuItem = ({ item }: any) => {
    const hasChildren = item.children && item.children.length > 0;

    return (
      <li key={item.id}>
        <div className='peer'>{item.title}</div>

        {hasChildren && (
          <ul className='hidden peer-hover:block'>
            {item.children.map((child: any) => (
              <MenuItem key={child.id} item={child} />
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <ul className='flex'>
      {menuData.map(item => (
        <MenuItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default Product;
