import Clients from './clients';
import { getContentForLogoWall } from '@/content/queries';

const LogoWall = async () => {
  const data = await getContentForLogoWall();
  return <Clients content={data.assetCollection.items} />;
};

export default LogoWall;
