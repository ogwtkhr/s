import { graphql, useStaticQuery } from 'gatsby';
import { FacilityInfoQuery } from '@/types';

type FacilityInfo = {
  id: string;
  title: string;
  description: string;
  link?: {
    title: string;
    url: string;
  };
  details?: Pick<FacilityInfo, 'id' | 'title' | 'description'>[];
};

export const useFacilityInfo = (): FacilityInfo[] => {
  const data = useStaticQuery<FacilityInfoQuery>(graphql`
    query FacilityInfo {
      settingYaml {
        facilities {
          id
          title
          description
          details {
            id
            title
            description
          }
          link {
            title
            url
          }
        }
      }
    }
  `);
  const facilityInfos: FacilityInfo[] =
    data.settingYaml?.facilities?.map((facility) => {
      const id = facility?.id || '';
      const title = facility?.title || '';
      const description = facility?.description || '';
      const details = facility?.details?.map((detail) => {
        const detailId = detail?.id || '';
        const detailTitle = detail?.title || '';
        const detailDescription = detail?.description || '';
        return {
          id: detailId,
          title: detailTitle,
          description: detailDescription,
        };
      });
      const link = facility?.link
        ? {
            title: facility?.link.title || '',
            url: facility?.link.url || '',
          }
        : undefined;
      return {
        id,
        title,
        description,
        details,
        link,
      };
    }) || [];

  return facilityInfos;
};
