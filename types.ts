export type CustomerPostQuery = {
  customerPostCollection: {
    items: {
      title: string;
      slug: string;
      customer: {
        logo: {
          url: string;
          width: number;
          height: number;
          title: string;
        };
        name: string;
      };
      body: {
        json: any; // or a more specific type if you know the structure
      };
    }[];
  };
};

export type HeaderNavQuery = {
  navigationCollection: {
    items: {
      name: string;
      linksCollection: {
        items: {
          link: string;
          label: string;
        }[];
      };
    }[];
  };
};

export type LogoWallQuery = {
  assetCollection: {
    items: {
      width: number;
      url: string;
      title: string;
      height: number;
    }[];
  };
};

export type HeroQuery = {
  heroCollection: {
    items: {
      title: string;
      subtitle: string;
      preTitle: string;
      callToActionsCollection: {
        items: {
          link: string;
          label: string;
        }[];
      };
    }[];
  };
};
