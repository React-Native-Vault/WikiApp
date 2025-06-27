import axios from 'axios';

const WIKIPEDIA_BASE_URL = 'https://fr.wikipedia.org/api/rest_v1';
const WIKIPEDIA_API_URL = 'https://fr.wikipedia.org/w/api.php';


export interface WikipediaSearchResult {
  pageid: number;
  title: string;
  extract: string;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
}


export interface WikipediaArticle {
  pageid: number;
  title: string;
  extract: string;
  content_urls: {
    desktop: {
      page: string;
    };
    mobile: {
      page: string;
    };
  };
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
}


const wikipediaApiClient = axios.create({
  timeout: 10000, // 10 secondes de timeout
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

export class WikipediaService {
      /**
   * Rechercher des articles Wikipedia
   * @param query - Terme de recherche
   * @param limit - Nombre de résultats (par défaut: 10)
   */
  static async searchArticles(query: string, limit: number = 10): Promise<WikipediaSearchResult[]> {
    try {
      const response = await wikipediaApiClient.get(WIKIPEDIA_API_URL, {
        params: {
          action: 'query',
          format: 'json',
          generator: 'search',
          gsrsearch: query,
          gsrlimit: limit,
          prop: 'extracts|pageimages',
          exintro: true,
          explaintext: true,
          exsentences: 2,
          piprop: 'thumbnail',
          pithumbsize: 300,
          origin: '*', // Pour éviter les problèmes CORS
        },
      });

      if (!response.data.query || !response.data.query.pages) {
        return [];
      }

      // Transformer l'objet pages en array
      const pages = Object.values(response.data.query.pages) as any[];
      
      return pages.map((page: any) => ({
        pageid: page.pageid,
        title: page.title,
        extract: page.extract || 'Aucun extrait disponible.',
        thumbnail: page.thumbnail ? {
          source: page.thumbnail.source,
          width: page.thumbnail.width,
          height: page.thumbnail.height,
        } : undefined,
      }));
    } catch (error) {
      console.error('Erreur lors de la recherche Wikipedia:', error);
      throw new Error('Impossible de rechercher les articles. Vérifiez votre connexion internet.');
    }
  }

}