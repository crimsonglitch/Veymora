import React, { useState, useEffect, useCallback, useMemo, useRef, createContext, useContext } from 'react';
import { motion, AnimatePresence, useSpring, useTransform, useScroll } from 'framer-motion';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Wind, 
  Droplets, 
  Thermometer, 
  Search,
  X,
  Grid,
  List,
  Plus,
  Minus,
  MapPin,
  Calendar,
  Clock,
  Eye,
  Gauge,
  Sunrise,
  Sunset,
  Moon,
  CloudSnow,
  Zap,
  Umbrella,
  Navigation,
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Settings,
  Info,
  AlertCircle,
  CheckCircle,
  Loader,
  Download,
  Share2,
  Bookmark,
  Star,
  Heart,
  Filter,
  SortAsc,
  SortDesc,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Menu,
  Bell,
  User,
  Globe,
  Wifi,
  WifiOff,
  Database,
  Server,
  Monitor,
  Smartphone,
  Tablet,
  Laptop
} from 'lucide-react';
import { 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar,
  AreaChart,
  Area,
  PieChart as RechartsPieChart,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
  Scatter,
  ScatterChart,
  ReferenceLine,
  Legend,
  Brush,
  ErrorBar
} from 'recharts';

// ==================== DETAILED TYPES ====================
interface Country {
  code: string;
  name: string;
  city: string;
  timezone: string;
  lat: number;
  lon: number;
  population: number;
  region: string;
  subregion: string;
  currency: string;
  language: string;
  flag: string;
  capital: string;
  area: number;
  borders: string[];
  callingCode: string;
  topLevelDomain: string;
  alpha2Code: string;
  alpha3Code: string;
  nativeName: string;
  numericCode: string;
  cioc: string;
  demonym: string;
  gini: number;
  continent: string;
  climateZone: string;
  isCoastal: boolean;
  averageElevation: number;
  majorIndustries: string[];
  touristAttractions: string[];
  culturalHighlights: string[];
  economicIndicators: {
    gdp: number;
    gdpPerCapita: number;
    unemploymentRate: number;
    inflationRate: number;
    exports: string[];
    imports: string[];
  };
  geographicFeatures: {
    rivers: string[];
    mountains: string[];
    lakes: string[];
    deserts: string[];
    forests: string[];
  };
  demographics: {
    populationDensity: number;
    urbanization: number;
    ageDistribution: {
      under15: number;
      between15and64: number;
      over65: number;
    };
    lifeExpectancy: number;
    literacyRate: number;
  };
}

interface DetailedHourlyForecast {
  time: number;
  datetime: Date;
  temperature: number;
  feelsLike: number;
  condition: string;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  windGust: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
  cloudCover: number;
  dewPoint: number;
  precipitation: number;
  precipitationProbability: number;
  precipitationType: string;
  airQuality: {
    aqi: number;
    co: number;
    no2: number;
    o3: number;
    so2: number;
    pm25: number;
    pm10: number;
  };
  solarRadiation: number;
  moonPhase: number;
  sunrise: Date;
  sunset: Date;
  moonrise: Date;
  moonset: Date;
  weatherAlerts: WeatherAlert[];
  comfort: {
    heatIndex: number;
    windChill: number;
    discomfortIndex: number;
  };
  agriculture: {
    soilMoisture: number;
    evapotranspiration: number;
    growingDegreeDays: number;
  };
}

interface ExtendedDailyForecast {
  date: Date;
  dayOfWeek: string;
  maxTemp: number;
  minTemp: number;
  avgTemp: number;
  condition: string;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
  cloudCover: number;
  sunrise: Date;
  sunset: Date;
  moonPhase: number;
  precipitation: number;
  precipitationProbability: number;
  precipitationType: string;
  hourlyData: DetailedHourlyForecast[];
  extremes: {
    maxWindSpeed: number;
    minVisibility: number;
    maxUvIndex: number;
    maxPrecipitation: number;
  };
  comfort: {
    avgHeatIndex: number;
    avgWindChill: number;
    comfortRating: number;
  };
  suitability: {
    outdoor: number;
    sports: number;
    travel: number;
    agriculture: number;
  };
}

interface WeatherAlert {
  id: string;
  title: string;
  description: string;
  severity: 'minor' | 'moderate' | 'severe' | 'extreme';
  urgency: 'immediate' | 'expected' | 'future' | 'past';
  certainty: 'observed' | 'likely' | 'possible' | 'unlikely';
  startTime: Date;
  endTime: Date;
  areas: string[];
  instruction: string;
  event: string;
  headline: string;
  msgType: string;
  category: string;
  responseType: string;
  web: string;
  contact: string;
  parameter: {
    [key: string]: string;
  };
}

interface ComprehensiveWeatherData {
  location: {
    city: string;
    country: string;
    region: string;
    lat: number;
    lon: number;
    timezone: string;
    localtime: Date;
    utcOffset: number;
  };
  current: {
    temperature: number;
    feelsLike: number;
    condition: string;
    description: string;
    icon: string;
    humidity: number;
    windSpeed: number;
    windDirection: number;
    windGust: number;
    pressure: number;
    visibility: number;
    uvIndex: number;
    cloudCover: number;
    dewPoint: number;
    precipitation: number;
    isDay: boolean;
    lastUpdated: Date;
  };
  forecast: {
    hourly: DetailedHourlyForecast[];
    daily: ExtendedDailyForecast[];
  };
  historical: {
    temperature: Array<{ date: Date; value: number }>;
    humidity: Array<{ date: Date; value: number }>;
    pressure: Array<{ date: Date; value: number }>;
    precipitation: Array<{ date: Date; value: number }>;
  };
  statistics: {
    temperature: {
      min: number;
      max: number;
      avg: number;
      median: number;
      mode: number;
      stdDev: number;
    };
    humidity: {
      min: number;
      max: number;
      avg: number;
      median: number;
      mode: number;
      stdDev: number;
    };
    pressure: {
      min: number;
      max: number;
      avg: number;
      median: number;
      mode: number;
      stdDev: number;
    };
    windSpeed: {
      min: number;
      max: number;
      avg: number;
      median: number;
      mode: number;
      stdDev: number;
    };
  };
  airQuality: {
    aqi: number;
    category: string;
    dominantPollutant: string;
    components: {
      co: number;
      no2: number;
      o3: number;
      so2: number;
      pm25: number;
      pm10: number;
    };
    forecast: Array<{
      date: Date;
      aqi: number;
      category: string;
      components: {
        co: number;
        no2: number;
        o3: number;
        so2: number;
        pm25: number;
        pm10: number;
      };
    }>;
  };
  astronomy: {
    sunrise: Date;
    sunset: Date;
    moonrise: Date;
    moonset: Date;
    moonPhase: number;
    moonIllumination: number;
    moonAge: number;
    moonSign: string;
    sunPosition: {
      azimuth: number;
      elevation: number;
    };
    moonPosition: {
      azimuth: number;
      elevation: number;
    };
    solarNoon: Date;
    civilTwilightBegin: Date;
    civilTwilightEnd: Date;
    nauticalTwilightBegin: Date;
    nauticalTwilightEnd: Date;
    astronomicalTwilightBegin: Date;
    astronomicalTwilightEnd: Date;
    dayLength: number;
    nightLength: number;
  };
  marine: {
    seaTemperature: number;
    waveHeight: number;
    waveDirection: number;
    wavePeriod: number;
    swellHeight: number;
    swellDirection: number;
    swellPeriod: number;
    tideHeight: number;
    tideDirection: string;
    nextHighTide: Date;
    nextLowTide: Date;
    visibility: number;
    currentSpeed: number;
    currentDirection: number;
  };
  agriculture: {
    soilTemperature: number;
    soilMoisture: number;
    evapotranspiration: number;
    growingDegreeDays: number;
    chillHours: number;
    leafWetness: number;
    frostProbability: number;
    heatStress: number;
    recommendations: string[];
  };
  health: {
    heatIndex: number;
    windChill: number;
    discomfortIndex: number;
    airQualityHealth: string;
    uvExposure: string;
    pollenForecast: {
      tree: number;
      grass: number;
      weed: number;
      mold: number;
      overall: number;
    };
    recommendations: string[];
  };
  energy: {
    solarPotential: number;
    windPotential: number;
    heatingDegreeDays: number;
    coolingDegreeDays: number;
    energyConsumptionForecast: {
      heating: number;
      cooling: number;
      lighting: number;
      overall: number;
    };
  };
  transportation: {
    roadConditions: string;
    visibility: number;
    windImpact: string;
    precipitationImpact: string;
    temperatureImpact: string;
    drivingDifficulty: number;
    flightDelayProbability: number;
    marineConditions: string;
    recommendations: string[];
  };
  recreation: {
    beachConditions: string;
    skiConditions: string;
    hikingConditions: string;
    campingConditions: string;
    golfConditions: string;
    outdoorComfort: number;
    suitability: {
      beach: number;
      hiking: number;
      camping: number;
      golf: number;
      cycling: number;
      running: number;
      picnic: number;
      festivals: number;
    };
  };
  alerts: WeatherAlert[];
  trends: {
    temperature: 'rising' | 'falling' | 'stable';
    pressure: 'rising' | 'falling' | 'stable';
    humidity: 'rising' | 'falling' | 'stable';
    windSpeed: 'increasing' | 'decreasing' | 'stable';
    conditions: 'improving' | 'deteriorating' | 'stable';
  };
  confidence: {
    temperature: number;
    precipitation: number;
    windSpeed: number;
    overall: number;
  };
  metadata: {
    provider: string;
    model: string;
    resolution: string;
    updateFrequency: string;
    lastUpdate: Date;
    nextUpdate: Date;
    dataQuality: number;
    coverage: string;
    accuracy: {
      temperature: number;
      precipitation: number;
      windSpeed: number;
      humidity: number;
    };
  };
}

interface WeatherPreferences {
  temperatureUnit: 'celsius' | 'fahrenheit' | 'kelvin';
  windSpeedUnit: 'kmh' | 'mph' | 'ms' | 'knots';
  pressureUnit: 'hpa' | 'inhg' | 'mmhg' | 'kpa';
  precipitationUnit: 'mm' | 'inches';
  visibilityUnit: 'km' | 'miles';
  timeFormat: '12h' | '24h';
  dateFormat: 'dd/mm/yyyy' | 'mm/dd/yyyy' | 'yyyy-mm-dd';
  language: string;
  theme: 'light' | 'dark' | 'auto';
  animations: boolean;
  sounds: boolean;
  notifications: boolean;
  autoRefresh: boolean;
  refreshInterval: number;
  defaultView: 'grid' | 'list' | 'map';
  chartType: 'line' | 'bar' | 'area';
  showForecast: boolean;
  forecastDays: number;
  showHourly: boolean;
  hourlyRange: number;
  showAlerts: boolean;
  alertSeverity: string[];
  showAirQuality: boolean;
  showUvIndex: boolean;
  showAstronomy: boolean;
  showMarine: boolean;
  showAgriculture: boolean;
  showHealth: boolean;
  showEnergy: boolean;
  showTransportation: boolean;
  showRecreation: boolean;
  favoriteCities: string[];
  recentSearches: string[];
  bookmarks: string[];
  customLocations: Array<{
    name: string;
    lat: number;
    lon: number;
    timezone: string;
  }>;
}

interface WeatherStore {
  weatherData: { [city: string]: ComprehensiveWeatherData };
  selectedCountries: Country[];
  loading: boolean;
  error: string | null;
  preferences: WeatherPreferences;
  lastUpdate: Date;
  networkStatus: 'online' | 'offline';
  dataQuality: number;
  cache: { [key: string]: any };
  statistics: {
    totalRequests: number;
    successfulRequests: number;
    failedRequests: number;
    averageResponseTime: number;
    cacheHitRate: number;
  };
  notifications: Array<{
    id: string;
    type: 'info' | 'warning' | 'error' | 'success';
    title: string;
    message: string;
    timestamp: Date;
    read: boolean;
    actions: Array<{
      label: string;
      handler: () => void;
    }>;
  }>;
  favorites: string[];
  bookmarks: string[];
  history: Array<{
    city: string;
    timestamp: Date;
    action: 'view' | 'add' | 'remove';
  }>;
  comparison: {
    cities: string[];
    metrics: string[];
    timeRange: string;
  };
  alerts: WeatherAlert[];
  maps: {
    center: { lat: number; lon: number };
    zoom: number;
    layers: string[];
    markers: Array<{
      lat: number;
      lon: number;
      city: string;
      data: any;
    }>;
  };
  charts: {
    temperature: any[];
    humidity: any[];
    pressure: any[];
    windSpeed: any[];
    precipitation: any[];
  };
  filters: {
    temperature: { min: number; max: number };
    humidity: { min: number; max: number };
    windSpeed: { min: number; max: number };
    condition: string[];
    region: string[];
    timezone: string[];
  };
  sorting: {
    field: string;
    direction: 'asc' | 'desc';
  };
  search: {
    term: string;
    suggestions: string[];
    history: string[];
    filters: any;
  };
  ui: {
    sidebarOpen: boolean;
    modalOpen: boolean;
    fullscreen: boolean;
    theme: 'light' | 'dark' | 'auto';
    layout: 'grid' | 'list' | 'map';
    density: 'compact' | 'comfortable' | 'spacious';
    animations: boolean;
    sounds: boolean;
  };
}

// ==================== COMPREHENSIVE CONSTANTS ====================
const COMPREHENSIVE_COUNTRIES: Country[] = [
  {
    code: 'US',
    name: 'United States',
    city: 'New York',
    timezone: 'America/New_York',
    lat: 40.7128,
    lon: -74.0060,
    population: 331449281,
    region: 'Americas',
    subregion: 'Northern America',
    currency: 'USD',
    language: 'English',
    flag: '🇺🇸',
    capital: 'Washington, D.C.',
    area: 9833517,
    borders: ['CAN', 'MEX'],
    callingCode: '+1',
    topLevelDomain: '.us',
    alpha2Code: 'US',
    alpha3Code: 'USA',
    nativeName: 'United States',
    numericCode: '840',
    cioc: 'USA',
    demonym: 'American',
    gini: 41.1,
    continent: 'North America',
    climateZone: 'Temperate',
    isCoastal: true,
    averageElevation: 760,
    majorIndustries: ['Technology', 'Finance', 'Healthcare', 'Manufacturing'],
    touristAttractions: ['Statue of Liberty', 'Grand Canyon', 'Yellowstone', 'Times Square'],
    culturalHighlights: ['Hollywood', 'Broadway', 'Jazz', 'Baseball'],
    economicIndicators: {
      gdp: 21427700000000,
      gdpPerCapita: 65280,
      unemploymentRate: 3.7,
      inflationRate: 2.3,
      exports: ['Machinery', 'Electronics', 'Vehicles', 'Aircraft'],
      imports: ['Electronics', 'Machinery', 'Vehicles', 'Oil']
    },
    geographicFeatures: {
      rivers: ['Mississippi', 'Missouri', 'Colorado', 'Rio Grande'],
      mountains: ['Rocky Mountains', 'Appalachian Mountains', 'Sierra Nevada'],
      lakes: ['Great Lakes', 'Lake Tahoe', 'Crater Lake'],
      deserts: ['Mojave Desert', 'Sonoran Desert', 'Great Basin'],
      forests: ['Redwood National Park', 'Great Smoky Mountains', 'Olympic National Forest']
    },
    demographics: {
      populationDensity: 36,
      urbanization: 82.3,
      ageDistribution: {
        under15: 19.3,
        between15and64: 65.9,
        over65: 14.8
      },
      lifeExpectancy: 78.9,
      literacyRate: 99.0
    }
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    city: 'London',
    timezone: 'Europe/London',
    lat: 51.5074,
    lon: -0.1278,
    population: 67886011,
    region: 'Europe',
    subregion: 'Northern Europe',
    currency: 'GBP',
    language: 'English',
    flag: '🇬🇧',
    capital: 'London',
    area: 242495,
    borders: ['IRL'],
    callingCode: '+44',
    topLevelDomain: '.uk',
    alpha2Code: 'GB',
    alpha3Code: 'GBR',
    nativeName: 'United Kingdom',
    numericCode: '826',
    cioc: 'GBR',
    demonym: 'British',
    gini: 33.2,
    continent: 'Europe',
    climateZone: 'Oceanic',
    isCoastal: true,
    averageElevation: 162,
    majorIndustries: ['Finance', 'Manufacturing', 'Services', 'Creative Industries'],
    touristAttractions: ['Big Ben', 'Buckingham Palace', 'Tower of London', 'Stonehenge'],
    culturalHighlights: ['Shakespeare', 'The Beatles', 'Premier League', 'Fish and Chips'],
    economicIndicators: {
      gdp: 2829108000000,
      gdpPerCapita: 42330,
      unemploymentRate: 3.8,
      inflationRate: 2.5,
      exports: ['Machinery', 'Vehicles', 'Chemicals', 'Pharmaceuticals'],
      imports: ['Machinery', 'Vehicles', 'Food', 'Fuels']
    },
    geographicFeatures: {
      rivers: ['Thames', 'Severn', 'Trent', 'Mersey'],
      mountains: ['Ben Nevis', 'Scafell Pike', 'Snowdon'],
      lakes: ['Lake District', 'Loch Ness', 'Lake Windermere'],
      deserts: [],
      forests: ['New Forest', 'Sherwood Forest', 'Forest of Dean']
    },
    demographics: {
      populationDensity: 281,
      urbanization: 83.4,
      ageDistribution: {
        under15: 17.6,
        between15and64: 64.2,
        over65: 18.2
      },
      lifeExpectancy: 81.2,
      literacyRate: 99.0
    }
  },
  {
    code: 'DE',
    name: 'Germany',
    city: 'Berlin',
    timezone: 'Europe/Berlin',
    lat: 52.5200,
    lon: 13.4050,
    population: 83783942,
    region: 'Europe',
    subregion: 'Western Europe',
    currency: 'EUR',
    language: 'German',
    flag: '🇩🇪',
    capital: 'Berlin',
    area: 357022,
    borders: ['AUT', 'BEL', 'CZE', 'DNK', 'FRA', 'LUX', 'NLD', 'POL', 'CHE'],
    callingCode: '+49',
    topLevelDomain: '.de',
    alpha2Code: 'DE',
    alpha3Code: 'DEU',
    nativeName: 'Deutschland',
    numericCode: '276',
    cioc: 'GER',
    demonym: 'German',
    gini: 31.9,
    continent: 'Europe',
    climateZone: 'Continental',
    isCoastal: true,
    averageElevation: 263,
    majorIndustries: ['Automotive', 'Machinery', 'Chemicals', 'Electronics'],
    touristAttractions: ['Brandenburg Gate', 'Neuschwanstein Castle', 'Cologne Cathedral', 'Oktoberfest'],
    culturalHighlights: ['Beer', 'Sausages', 'Classical Music', 'Christmas Markets'],
    economicIndicators: {
      gdp: 3846414000000,
      gdpPerCapita: 46560,
      unemploymentRate: 3.2,
      inflationRate: 1.4,
      exports: ['Vehicles', 'Machinery', 'Chemicals', 'Electronics'],
      imports: ['Machinery', 'Vehicles', 'Chemicals', 'Electronics']
    },
    geographicFeatures: {
      rivers: ['Rhine', 'Elbe', 'Danube', 'Weser'],
      mountains: ['Alps', 'Black Forest', 'Bavarian Forest'],
      lakes: ['Lake Constance', 'Müritz', 'Chiemsee'],
      deserts: [],
      forests: ['Black Forest', 'Bavarian Forest', 'Harz']
    },
    demographics: {
      populationDensity: 240,
      urbanization: 77.3,
      ageDistribution: {
        under15: 14.1,
        between15and64: 64.2,
        over65: 21.7
      },
      lifeExpectancy: 81.3,
      literacyRate: 99.0
    }
  },
  {
    code: 'FR',
    name: 'France',
    city: 'Paris',
    timezone: 'Europe/Paris',
    lat: 48.8566,
    lon: 2.3522,
    population: 65273511,
    region: 'Europe',
    subregion: 'Western Europe',
    currency: 'EUR',
    language: 'French',
    flag: '🇫🇷',
    capital: 'Paris',
    area: 643801,
    borders: ['AND', 'BEL', 'DEU', 'ITA', 'LUX', 'MCO', 'ESP', 'CHE'],
    callingCode: '+33',
    topLevelDomain: '.fr',
    alpha2Code: 'FR',
    alpha3Code: 'FRA',
    nativeName: 'France',
    numericCode: '250',
    cioc: 'FRA',
    demonym: 'French',
    gini: 32.4,
    continent: 'Europe',
    climateZone: 'Temperate',
    isCoastal: true,
    averageElevation: 375,
    majorIndustries: ['Aerospace', 'Automotive', 'Luxury Goods', 'Tourism'],
    touristAttractions: ['Eiffel Tower', 'Louvre Museum', 'Palace of Versailles', 'Mont Blanc'],
    culturalHighlights: ['Cuisine', 'Fashion', 'Wine', 'Art'],
    economicIndicators: {
      gdp: 2715518000000,
      gdpPerCapita: 42330,
      unemploymentRate: 8.1,
      inflationRate: 1.8,
      exports: ['Machinery', 'Aircraft', 'Vehicles', 'Pharmaceuticals'],
      imports: ['Machinery', 'Vehicles', 'Crude Oil', 'Aircraft']
    },
    geographicFeatures: {
      rivers: ['Seine', 'Loire', 'Garonne', 'Rhône'],
      mountains: ['Alps', 'Pyrenees', 'Massif Central'],
      lakes: ['Lake Geneva', 'Lake Annecy', 'Lake Bourget'],
      deserts: [],
      forests: ['Forest of Fontainebleau', 'Vosges', 'Ardennes']
    },
    demographics: {
      populationDensity: 105,
      urbanization: 80.4,
      ageDistribution: {
        under15: 18.1,
        between15and64: 61.9,
        over65: 20.0
      },
      lifeExpectancy: 82.7,
      literacyRate: 99.0
    }
  },
  {
    code: 'IT',
    name: 'Italy',
    city: 'Rome',
    timezone: 'Europe/Rome',
    lat: 41.9028,
    lon: 12.4964,
    population: 60461826,
    region: 'Europe',
    subregion: 'Southern Europe',
    currency: 'EUR',
    language: 'Italian',
    flag: '🇮🇹',
    capital: 'Rome',
    area: 301340,
    borders: ['AUT', 'FRA', 'SMR', 'SVN', 'CHE', 'VAT'],
    callingCode: '+39',
    topLevelDomain: '.it',
    alpha2Code: 'IT',
    alpha3Code: 'ITA',
    nativeName: 'Italia',
    numericCode: '380',
    cioc: 'ITA',
    demonym: 'Italian',
    gini: 35.9,
    continent: 'Europe',
    climateZone: 'Mediterranean',
    isCoastal: true,
    averageElevation: 538,
    majorIndustries: ['Manufacturing', 'Fashion', 'Automotive', 'Tourism'],
    touristAttractions: ['Colosseum', 'Vatican City', 'Leaning Tower of Pisa', 'Venice'],
    culturalHighlights: ['Renaissance Art', 'Opera', 'Pasta', 'Fashion'],
    economicIndicators: {
      gdp: 2106287000000,
      gdpPerCapita: 34260,
      unemploymentRate: 9.9,
      inflationRate: 1.2,
      exports: ['Machinery', 'Vehicles', 'Pharmaceuticals', 'Clothing'],
      imports: ['Crude Oil', 'Machinery', 'Vehicles', 'Pharmaceuticals']
    },
    geographicFeatures: {
      rivers: ['Po', 'Tiber', 'Adige', 'Arno'],
      mountains: ['Alps', 'Apennines', 'Dolomites'],
      lakes: ['Lake Garda', 'Lake Maggiore', 'Lake Como'],
      deserts: [],
      forests: ['Italian Alps', 'Apennine Mountains', 'Calabrian Forests']
    },
    demographics: {
      populationDensity: 206,
      urbanization: 70.4,
      ageDistribution: {
        under15: 13.2,
        between15and64: 64.1,
        over65: 22.7
      },
      lifeExpectancy: 83.5,
      literacyRate: 99.2
    }
  },
  {
    code: 'ES',
    name: 'Spain',
    city: 'Madrid',
    timezone: 'Europe/Madrid',
    lat: 40.4168,
    lon: -3.7038,
    population: 46754778,
    region: 'Europe',
    subregion: 'Southern Europe',
    currency: 'EUR',
    language: 'Spanish',
    flag: '🇪🇸',
    capital: 'Madrid',
    area: 505370,
    borders: ['AND', 'FRA', 'GIB', 'PRT', 'MAR'],
    callingCode: '+34',
    topLevelDomain: '.es',
    alpha2Code: 'ES',
    alpha3Code: 'ESP',
    nativeName: 'España',
    numericCode: '724',
    cioc: 'ESP',
    demonym: 'Spanish',
    gini: 34.7,
    continent: 'Europe',
    climateZone: 'Mediterranean',
    isCoastal: true,
    averageElevation: 660,
    majorIndustries: ['Tourism', 'Manufacturing', 'Agriculture', 'Renewable Energy'],
    touristAttractions: ['Sagrada Familia', 'Alhambra', 'Prado Museum', 'Camino de Santiago'],
    culturalHighlights: ['Flamenco', 'Tapas', 'Bullfighting', 'Siesta'],
    economicIndicators: {
      gdp: 1394116000000,
      gdpPerCapita: 29600,
      unemploymentRate: 14.1,
      inflationRate: 1.8,
      exports: ['Machinery', 'Vehicles', 'Food', 'Pharmaceuticals'],
      imports: ['Machinery', 'Fuels', 'Chemicals', 'Vehicles']
    },
    geographicFeatures: {
      rivers: ['Ebro', 'Tagus', 'Duero', 'Guadalquivir'],
      mountains: ['Pyrenees', 'Sierra Nevada', 'Cantabrian Mountains'],
      lakes: ['Lake Sanabria', 'Lake Banyoles'],
      deserts: ['Tabernas Desert'],
      forests: ['Pyrenean Forests', 'Galician Forests', 'Andalusian Forests']
    },
    demographics: {
      populationDensity: 94,
      urbanization: 80.3,
      ageDistribution: {
        under15: 15.0,
        between15and64: 65.8,
        over65: 19.2
      },
      lifeExpectancy: 83.6,
      literacyRate: 98.4
    }
  },
  {
    code: 'JP',
    name: 'Japan',
    city: 'Tokyo',
    timezone: 'Asia/Tokyo',
    lat: 35.6762,
    lon: 139.6503,
    population: 126476461,
    region: 'Asia',
    subregion: 'Eastern Asia',
    currency: 'JPY',
    language: 'Japanese',
    flag: '🇯🇵',
    capital: 'Tokyo',
    area: 377930,
    borders: [],
    callingCode: '+81',
    topLevelDomain: '.jp',
    alpha2Code: 'JP',
    alpha3Code: 'JPN',
    nativeName: '日本',
    numericCode: '392',
    cioc: 'JPN',
    demonym: 'Japanese',
    gini: 32.9,
    continent: 'Asia',
    climateZone: 'Temperate',
    isCoastal: true,
    averageElevation: 438,
    majorIndustries: ['Technology', 'Automotive', 'Manufacturing', 'Electronics'],
    touristAttractions: ['Mount Fuji', 'Kyoto Temples', 'Tokyo Skytree', 'Hiroshima Peace Memorial'],
    culturalHighlights: ['Anime', 'Sushi', 'Samurai', 'Tea Ceremony'],
    economicIndicators: {
      gdp: 4872137000000,
      gdpPerCapita: 39290,
      unemploymentRate: 2.8,
      inflationRate: 0.5,
      exports: ['Vehicles', 'Machinery', 'Electronics', 'Optical Instruments'],
      imports: ['Fuels', 'Machinery', 'Food', 'Chemicals']
    },
    geographicFeatures: {
      rivers: ['Shinano', 'Tone', 'Ishikari', 'Teshio'],
      mountains: ['Mount Fuji', 'Japanese Alps', 'Mount Aso'],
      lakes: ['Lake Biwa', 'Lake Kasumigaura', 'Lake Saroma'],
      deserts: [],
      forests: ['Temperate Forests', 'Subtropical Forests', 'Boreal Forests']
    },
    demographics: {
      populationDensity: 347,
      urbanization: 91.8,
      ageDistribution: {
        under15: 12.2,
        between15and64: 59.7,
        over65: 28.1
      },
      lifeExpectancy: 84.6,
      literacyRate: 99.0
    }
  },
  {
    code: 'CN',
    name: 'China',
    city: 'Beijing',
    timezone: 'Asia/Shanghai',
    lat: 39.9042,
    lon: 116.4074,
    population: 1439323776,
    region: 'Asia',
    subregion: 'Eastern Asia',
    currency: 'CNY',
    language: 'Chinese',
    flag: '🇨🇳',
    capital: 'Beijing',
    area: 9596961,
    borders: ['AFG', 'BTN', 'MMR', 'HKG', 'IND', 'KAZ', 'PRK', 'KGZ', 'LAO', 'MAC', 'MNG', 'PAK', 'RUS', 'TJK', 'VNM'],
    callingCode: '+86',
    topLevelDomain: '.cn',
    alpha2Code: 'CN',
    alpha3Code: 'CHN',
    nativeName: '中国',
    numericCode: '156',
    cioc: 'CHN',
    demonym: 'Chinese',
    gini: 38.5,
    continent: 'Asia',
    climateZone: 'Continental',
    isCoastal: true,
    averageElevation: 1840,
    majorIndustries: ['Manufacturing', 'Technology', 'Agriculture', 'Services'],
    touristAttractions: ['Great Wall of China', 'Forbidden City', 'Terracotta Army', 'Zhangjiajie'],
    culturalHighlights: ['Kung Fu', 'Chinese New Year', 'Calligraphy', 'Traditional Medicine'],
    economicIndicators: {
      gdp: 14342903000000,
      gdpPerCapita: 10500,
      unemploymentRate: 3.8,
      inflationRate: 2.9,
      exports: ['Electronics', 'Machinery', 'Textiles', 'Chemicals'],
      imports: ['Electronics', 'Machinery', 'Oil', 'Medical Equipment']
    },
    geographicFeatures: {
      rivers: ['Yangtze', 'Yellow River', 'Pearl River', 'Heilongjiang'],
      mountains: ['Himalayas', 'Kunlun Mountains', 'Tian Shan'],
      lakes: ['Poyang Lake', 'Dongting Lake', 'Taihu Lake'],
      deserts: ['Gobi Desert', 'Taklamakan Desert', 'Badain Jaran'],
      forests: ['Northeast China Plain', 'Yangtze River Basin', 'South China']
    },
    demographics: {
      populationDensity: 153,
      urbanization: 60.3,
      ageDistribution: {
        under15: 17.3,
        between15and64: 70.7,
        over65: 12.0
      },
      lifeExpectancy: 76.9,
      literacyRate: 96.8
    }
  },
  {
    code: 'IN',
    name: 'India',
    city: 'Mumbai',
    timezone: 'Asia/Kolkata',
    lat: 19.0760,
    lon: 72.8777,
    population: 1380004385,
    region: 'Asia',
    subregion: 'Southern Asia',
    currency: 'INR',
    language: 'Hindi',
    flag: '🇮🇳',
    capital: 'New Delhi',
    area: 3287263,
    borders: ['AFG', 'BGD', 'BTN', 'MMR', 'CHN', 'NPL', 'PAK', 'LKA'],
    callingCode: '+91',
    topLevelDomain: '.in',
    alpha2Code: 'IN',
    alpha3Code: 'IND',
    nativeName: 'भारत',
    numericCode: '356',
    cioc: 'IND',
    demonym: 'Indian',
    gini: 35.7,
    continent: 'Asia',
    climateZone: 'Tropical',
    isCoastal: true,
    averageElevation: 160,
    majorIndustries: ['IT Services', 'Manufacturing', 'Agriculture', 'Pharmaceuticals'],
    touristAttractions: ['Taj Mahal', 'Red Fort', 'Goa Beaches', 'Kerala Backwaters'],
    culturalHighlights: ['Bollywood', 'Yoga', 'Spices', 'Festivals'],
    economicIndicators: {
      gdp: 2875142000000,
      gdpPerCapita: 2100,
      unemploymentRate: 3.5,
      inflationRate: 4.8,
      exports: ['Petroleum Products', 'Textiles', 'Chemicals', 'Pharmaceuticals'],
      imports: ['Crude Oil', 'Electronics', 'Gold', 'Machinery']
    },
    geographicFeatures: {
      rivers: ['Ganges', 'Brahmaputra', 'Indus', 'Godavari'],
      mountains: ['Himalayas', 'Western Ghats', 'Eastern Ghats'],
      lakes: ['Dal Lake', 'Chilika Lake', 'Vembanad Lake'],
      deserts: ['Thar Desert', 'Cold Desert'],
      forests: ['Western Ghats', 'Eastern Ghats', 'Sundarbans']
    },
    demographics: {
      populationDensity: 464,
      urbanization: 34.5,
      ageDistribution: {
        under15: 26.2,
        between15and64: 67.3,
        over65: 6.5
      },
      lifeExpectancy: 69.7,
      literacyRate: 74.4
    }
  },
  {
    code: 'BR',
    name: 'Brazil',
    city: 'São Paulo',
    timezone: 'America/Sao_Paulo',
    lat: -23.5558,
    lon: -46.6396,
    population: 212559417,
    region: 'Americas',
    subregion: 'South America',
    currency: 'BRL',
    language: 'Portuguese',
    flag: '🇧🇷',
    capital: 'Brasília',
    area: 8514877,
    borders: ['ARG', 'BOL', 'COL', 'GUF', 'GUY', 'PRY', 'PER', 'SUR', 'URY', 'VEN'],
    callingCode: '+55',
    topLevelDomain: '.br',
    alpha2Code: 'BR',
    alpha3Code: 'BRA',
    nativeName: 'Brasil',
    numericCode: '076',
    cioc: 'BRA',
    demonym: 'Brazilian',
    gini: 53.9,
    continent: 'South America',
    climateZone: 'Tropical',
    isCoastal: true,
    averageElevation: 320,
    majorIndustries: ['Agriculture', 'Mining', 'Manufacturing', 'Services'],
    touristAttractions: ['Christ the Redeemer', 'Iguazu Falls', 'Amazon Rainforest', 'Copacabana Beach'],
    culturalHighlights: ['Carnival', 'Samba', 'Football', 'Capoeira'],
    economicIndicators: {
      gdp: 1608981000000,
      gdpPerCapita: 7610,
      unemploymentRate: 11.9,
      inflationRate: 4.3,
      exports: ['Soybeans', 'Iron Ore', 'Crude Oil', 'Sugar'],
      imports: ['Machinery', 'Electronics', 'Vehicles', 'Pharmaceuticals']
    },
    geographicFeatures: {
      rivers: ['Amazon', 'Paraná', 'Tocantins', 'São Francisco'],
      mountains: ['Brazilian Highlands', 'Guiana Highlands'],
      lakes: ['Balbina Reservoir', 'Sobradinho Reservoir'],
      deserts: ['Caatinga'],
      forests: ['Amazon Rainforest', 'Atlantic Forest', 'Cerrado']
    },
    demographics: {
      populationDensity: 25,
      urbanization: 87.1,
      ageDistribution: {
        under15: 21.8,
        between15and64: 69.4,
        over65: 8.8
      },
      lifeExpectancy: 75.9,
      literacyRate: 93.2
    }
  },
  {
    code: 'CA',
    name: 'Canada',
    city: 'Toronto',
    timezone: 'America/Toronto',
    lat: 43.6532,
    lon: -79.3832,
    population: 37742154,
    region: 'Americas',
    subregion: 'Northern America',
    currency: 'CAD',
    language: 'English',
    flag: '🇨🇦',
    capital: 'Ottawa',
    area: 9984670,
    borders: ['USA'],
    callingCode: '+1',
    topLevelDomain: '.ca',
    alpha2Code: 'CA',
    alpha3Code: 'CAN',
    nativeName: 'Canada',
    numericCode: '124',
    cioc: 'CAN',
    demonym: 'Canadian',
    gini: 34.0,
    continent: 'North America',
    climateZone: 'Continental',
    isCoastal: true,
    averageElevation: 487,
    majorIndustries: ['Natural Resources', 'Manufacturing', 'Services', 'Technology'],
    touristAttractions: ['Niagara Falls', 'Banff National Park', 'CN Tower', 'Old Quebec'],
    culturalHighlights: ['Hockey', 'Maple Syrup', 'Multiculturalism', 'Poutine'],
    economicIndicators: {
      gdp: 1736426000000,
      gdpPerCapita: 46260,
      unemploymentRate: 5.7,
      inflationRate: 1.9,
      exports: ['Energy', 'Forestry', 'Mining', 'Agriculture'],
      imports: ['Machinery', 'Electronics', 'Vehicles', 'Energy']
    },
    geographicFeatures: {
      rivers: ['Mackenzie', 'Yukon', 'St. Lawrence', 'Nelson'],
      mountains: ['Rocky Mountains', 'Appalachian Mountains', 'Coast Mountains'],
      lakes: ['Great Lakes', 'Great Bear Lake', 'Great Slave Lake'],
      deserts: ['Great Basin Desert'],
      forests: ['Boreal Forest', 'Temperate Rainforest', 'Mixed Forest']
    },
    demographics: {
      populationDensity: 4,
      urbanization: 81.4,
      ageDistribution: {
        under15: 15.6,
        between15and64: 66.8,
        over65: 17.6
      },
      lifeExpectancy: 82.4,
      literacyRate: 99.0
    }
  },
  {
    code: 'AU',
    name: 'Australia',
    city: 'Sydney',
    timezone: 'Australia/Sydney',
    lat: -33.8688,
    lon: 151.2093,
    population: 25499884,
    region: 'Oceania',
    subregion: 'Australia and New Zealand',
    currency: 'AUD',
    language: 'English',
    flag: '🇦🇺',
    capital: 'Canberra',
    area: 7741220,
    borders: [],
    callingCode: '+61',
    topLevelDomain: '.au',
    alpha2Code: 'AU',
    alpha3Code: 'AUS',
    nativeName: 'Australia',
    numericCode: '036',
    cioc: 'AUS',
    demonym: 'Australian',
    gini: 34.4,
    continent: 'Oceania',
    climateZone: 'Arid',
    isCoastal: true,
    averageElevation: 330,
    majorIndustries: ['Mining', 'Agriculture', 'Services', 'Tourism'],
    touristAttractions: ['Sydney Opera House', 'Great Barrier Reef', 'Uluru', 'Twelve Apostles'],
    culturalHighlights: ['Surfing', 'Barbecue', 'Aboriginal Culture', 'Rugby'],
    economicIndicators: {
      gdp: 1392681000000,
      gdpPerCapita: 55060,
      unemploymentRate: 5.2,
      inflationRate: 1.6,
      exports: ['Iron Ore', 'Coal', 'Natural Gas', 'Gold'],
      imports: ['Machinery', 'Electronics', 'Vehicles', 'Pharmaceuticals']
    },
    geographicFeatures: {
      rivers: ['Murray', 'Darling', 'Murrumbidgee', 'Lachlan'],
      mountains: ['Great Dividing Range', 'Snowy Mountains', 'Blue Mountains'],
      lakes: ['Lake Eyre', 'Lake Torrens', 'Lake Gairdner'],
      deserts: ['Great Victoria Desert', 'Great Sandy Desert', 'Tanami Desert'],
      forests: ['Tropical Rainforest', 'Temperate Forest', 'Eucalyptus Forest']
    },
    demographics: {
      populationDensity: 3,
      urbanization: 86.2,
      ageDistribution: {
        under15: 18.8,
        between15and64: 64.7,
        over65: 16.5
      },
      lifeExpectancy: 83.4,
      literacyRate: 99.0
    }
  },
  {
    code: 'RU',
    name: 'Russia',
    city: 'Moscow',
    timezone: 'Europe/Moscow',
    lat: 55.7558,
    lon: 37.6176,
    population: 145934462,
    region: 'Europe',
    subregion: 'Eastern Europe',
    currency: 'RUB',
    language: 'Russian',
    flag: '🇷🇺',
    capital: 'Moscow',
    area: 17098242,
    borders: ['AZE', 'BLR', 'CHN', 'EST', 'FIN', 'GEO', 'KAZ', 'PRK', 'LVA', 'LTU', 'MNG', 'NOR', 'POL', 'UKR'],
    callingCode: '+7',
    topLevelDomain: '.ru',
    alpha2Code: 'RU',
    alpha3Code: 'RUS',
    nativeName: 'Россия',
    numericCode: '643',
    cioc: 'RUS',
    demonym: 'Russian',
    gini: 37.5,
    continent: 'Europe',
    climateZone: 'Continental',
    isCoastal: true,
    averageElevation: 600,
    majorIndustries: ['Energy', 'Mining', 'Manufacturing', 'Agriculture'],
    touristAttractions: ['Red Square', 'Hermitage Museum', 'Trans-Siberian Railway', 'Lake Baikal'],
    culturalHighlights: ['Ballet', 'Literature', 'Vodka', 'Matryoshka Dolls'],
    economicIndicators: {
      gdp: 1483498000000,
      gdpPerCapita: 10230,
      unemploymentRate: 4.6,
      inflationRate: 6.5,
      exports: ['Energy', 'Metals', 'Machinery', 'Chemicals'],
      imports: ['Machinery', 'Vehicles', 'Pharmaceuticals', 'Plastics']
    },
    geographicFeatures: {
      rivers: ['Volga', 'Yenisei', 'Lena', 'Ob'],
      mountains: ['Ural Mountains', 'Caucasus Mountains', 'Altai Mountains'],
      lakes: ['Lake Baikal', 'Lake Ladoga', 'Lake Onega'],
      deserts: ['Kyzylkum Desert'],
      forests: ['Taiga', 'Mixed Forest', 'Steppe']
    },
    demographics: {
      populationDensity: 9,
      urbanization: 74.4,
      ageDistribution: {
        under15: 18.1,
        between15and64: 66.8,
        over65: 15.1
      },
      lifeExpectancy: 72.6,
      literacyRate: 99.7
    }
  },
  {
    code: 'KR',
    name: 'South Korea',
    city: 'Seoul',
    timezone: 'Asia/Seoul',
    lat: 37.5665,
    lon: 126.9780,
    population: 51269185,
    region: 'Asia',
    subregion: 'Eastern Asia',
    currency: 'KRW',
    language: 'Korean',
    flag: '🇰🇷',
    capital: 'Seoul',
    area: 103319,
    borders: ['PRK'],
    callingCode: '+82',
    topLevelDomain: '.kr',
    alpha2Code: 'KR',
    alpha3Code: 'KOR',
    nativeName: '대한민국',
    numericCode: '410',
    cioc: 'KOR',
    demonym: 'South Korean',
    gini: 31.4,
    continent: 'Asia',
    climateZone: 'Temperate',
    isCoastal: true,
    averageElevation: 282,
    majorIndustries: ['Technology', 'Automotive', 'Shipbuilding', 'Steel'],
    touristAttractions: ['Gyeongbokgung Palace', 'Jeju Island', 'Busan Beaches', 'DMZ'],
    culturalHighlights: ['K-Pop', 'Korean BBQ', 'Taekwondo', 'Hanbok'],
    economicIndicators: {
      gdp: 1642383000000,
      gdpPerCapita: 31430,
      unemploymentRate: 4.0,
      inflationRate: 2.0,
      exports: ['Electronics', 'Machinery', 'Vehicles', 'Steel'],
      imports: ['Machinery', 'Electronics', 'Fuels', 'Steel']
    },
    geographicFeatures: {
      rivers: ['Han River', 'Nakdong River', 'Geum River'],
      mountains: ['Taebaek Mountains', 'Sobaek Mountains', 'Jiri Mountain'],
      lakes: ['Lake Cheonji', 'Andong Lake'],
      deserts: [],
      forests: ['Temperate Forest', 'Mixed Forest', 'Coniferous Forest']
    },
    demographics: {
      populationDensity: 527,
      urbanization: 81.4,
      ageDistribution: {
        under15: 12.9,
        between15and64: 72.1,
        over65: 15.0
      },
      lifeExpectancy: 83.0,
      literacyRate: 97.9
    }
  },
  {
    code: 'MX',
    name: 'Mexico',
    city: 'Mexico City',
    timezone: 'America/Mexico_City',
    lat: 19.4326,
    lon: -99.1332,
    population: 128932753,
    region: 'Americas',
    subregion: 'Central America',
    currency: 'MXN',
    language: 'Spanish',
    flag: '🇲🇽',
    capital: 'Mexico City',
    area: 1964375,
    borders: ['BLZ', 'GTM', 'USA'],
    callingCode: '+52',
    topLevelDomain: '.mx',
    alpha2Code: 'MX',
    alpha3Code: 'MEX',
    nativeName: 'México',
    numericCode: '484',
    cioc: 'MEX',
    demonym: 'Mexican',
    gini: 48.2,
    continent: 'North America',
    climateZone: 'Tropical',
    isCoastal: true,
    averageElevation: 1111,
    majorIndustries: ['Manufacturing', 'Agriculture', 'Mining', 'Tourism'],
    touristAttractions: ['Chichen Itza', 'Teotihuacan', 'Cancun', 'Guadalajara'],
    culturalHighlights: ['Day of the Dead', 'Mariachi', 'Tacos', 'Lucha Libre'],
    economicIndicators: {
      gdp: 1078669000000,
      gdpPerCapita: 8350,
      unemploymentRate: 3.5,
      inflationRate: 5.7,
      exports: ['Manufactured Goods', 'Oil', 'Silver', 'Fruits'],
      imports: ['Machinery', 'Steel', 'Agricultural Products', 'Electrical Equipment']
    },
    geographicFeatures: {
      rivers: ['Rio Grande', 'Lerma River', 'Balsas River'],
      mountains: ['Sierra Madre Oriental', 'Sierra Madre Occidental', 'Trans-Mexican Volcanic Belt'],
      lakes: ['Lake Chapala', 'Lake Cuitzeo', 'Lake Patzcuaro'],
      deserts: ['Chihuahuan Desert', 'Sonoran Desert'],
      forests: ['Cloud Forest', 'Tropical Rainforest', 'Pine-Oak Forest']
    },
    demographics: {
      populationDensity: 66,
      urbanization: 80.2,
      ageDistribution: {
        under15: 26.2,
        between15and64: 65.8,
        over65: 8.0
      },
      lifeExpectancy: 75.1,
      literacyRate: 95.4
    }
  },
  {
    code: 'AR',
    name: 'Argentina',
    city: 'Buenos Aires',
    timezone: 'America/Argentina/Buenos_Aires',
    lat: -34.6037,
    lon: -58.3816,
    population: 45195774,
    region: 'Americas',
    subregion: 'South America',
    currency: 'ARS',
    language: 'Spanish',
    flag: '🇦🇷',
    capital: 'Buenos Aires',
    area: 2780400,
    borders: ['BOL', 'BRA', 'CHL', 'PRY', 'URY'],
    callingCode: '+54',
    topLevelDomain: '.ar',
    alpha2Code: 'AR',
    alpha3Code: 'ARG',
    nativeName: 'Argentina',
    numericCode: '032',
    cioc: 'ARG',
    demonym: 'Argentine',
    gini: 42.9,
    continent: 'South America',
    climateZone: 'Temperate',
    isCoastal: true,
    averageElevation: 595,
    majorIndustries: ['Agriculture', 'Manufacturing', 'Mining', 'Services'],
    touristAttractions: ['Iguazu Falls', 'Perito Moreno Glacier', 'Bariloche', 'Ushuaia'],
    culturalHighlights: ['Tango', 'Beef', 'Football', 'Wine'],
    economicIndicators: {
      gdp: 449663000000,
      gdpPerCapita: 9930,
      unemploymentRate: 10.4,
      inflationRate: 48.4,
      exports: ['Beef', 'Wheat', 'Corn', 'Soybeans'],
      imports: ['Machinery', 'Vehicles', 'Petroleum', 'Chemicals']
    },
    geographicFeatures: {
      rivers: ['Paraná', 'Uruguay', 'Colorado', 'Negro'],
      mountains: ['Andes Mountains', 'Aconcagua', 'Cerro Mercedario'],
      lakes: ['Lake Nahuel Huapi', 'Lake Argentino', 'Lake Viedma'],
      deserts: ['Patagonian Desert'],
      forests: ['Valdivian Temperate Rainforest', 'Patagonian Forest']
    },
    demographics: {
      populationDensity: 16,
      urbanization: 92.1,
      ageDistribution: {
        under15: 24.7,
        between15and64: 63.8,
        over65: 11.5
      },
      lifeExpectancy: 76.7,
      literacyRate: 99.0
    }
  },
  {
    code: 'ZA',
    name: 'South Africa',
    city: 'Cape Town',
    timezone: 'Africa/Johannesburg',
    lat: -33.9249,
    lon: 18.4241,
    population: 59308690,
    region: 'Africa',
    subregion: 'Southern Africa',
    currency: 'ZAR',
    language: 'Afrikaans',
    flag: '🇿🇦',
    capital: 'Cape Town',
    area: 1221037,
    borders: ['BWA', 'LSO', 'MOZ', 'NAM', 'SWZ', 'ZWE'],
    callingCode: '+27',
    topLevelDomain: '.za',
    alpha2Code: 'ZA',
    alpha3Code: 'ZAF',
    nativeName: 'South Africa',
    numericCode: '710',
    cioc: 'RSA',
    demonym: 'South African',
    gini: 63.0,
    continent: 'Africa',
    climateZone: 'Temperate',
    isCoastal: true,
    averageElevation: 1034,
    majorIndustries: ['Mining', 'Manufacturing', 'Agriculture', 'Services'],
    touristAttractions: ['Table Mountain', 'Kruger National Park', 'Robben Island', 'Cape of Good Hope'],
    culturalHighlights: ['Rainbow Nation', 'Braai', 'Rugby', 'Ubuntu'],
    economicIndicators: {
      gdp: 419015000000,
      gdpPerCapita: 7055,
      unemploymentRate: 28.7,
      inflationRate: 4.5,
      exports: ['Gold', 'Diamonds', 'Platinum', 'Vehicles'],
      imports: ['Machinery', 'Electronics', 'Vehicles', 'Pharmaceuticals']
    },
    geographicFeatures: {
      rivers: ['Orange River', 'Vaal River', 'Limpopo River'],
      mountains: ['Drakensberg Mountains', 'Table Mountain', 'Magaliesberg'],
      lakes: ['Lake Chrissie', 'Lake Fundudzi'],
      deserts: ['Kalahari Desert', 'Karoo'],
      forests: ['Knysna Forest', 'Tsitsikamma Forest']
    },
    demographics: {
      populationDensity: 49,
      urbanization: 66.4,
      ageDistribution: {
        under15: 28.7,
        between15and64: 65.7,
        over65: 5.6
      },
      lifeExpectancy: 64.1,
      literacyRate: 87.0
    }
  },
  {
    code: 'EG',
    name: 'Egypt',
    city: 'Cairo',
    timezone: 'Africa/Cairo',
    lat: 30.0444,
    lon: 31.2357,
    population: 102334404,
    region: 'Africa',
    subregion: 'Northern Africa',
    currency: 'EGP',
    language: 'Arabic',
    flag: '🇪🇬',
    capital: 'Cairo',
    area: 1001450,
    borders: ['ISR', 'LBY', 'SDN'],
    callingCode: '+20',
    topLevelDomain: '.eg',
    alpha2Code: 'EG',
    alpha3Code: 'EGY',
    nativeName: 'مصر',
    numericCode: '818',
    cioc: 'EGY',
    demonym: 'Egyptian',
    gini: 31.5,
    continent: 'Africa',
    climateZone: 'Arid',
    isCoastal: true,
    averageElevation: 321,
    majorIndustries: ['Tourism', 'Agriculture', 'Manufacturing', 'Petroleum'],
    touristAttractions: ['Pyramids of Giza', 'Valley of the Kings', 'Abu Simbel', 'Karnak Temple'],
    culturalHighlights: ['Ancient History', 'Arabic Culture', 'Coptic Christianity', 'Nile River'],
    economicIndicators: {
      gdp: 404143000000,
      gdpPerCapita: 3970,
      unemploymentRate: 7.9,
      inflationRate: 13.9,
      exports: ['Natural Gas', 'Petroleum Products', 'Cotton', 'Textiles'],
      imports: ['Machinery', 'Food', 'Chemicals', 'Wood Products']
    },
    geographicFeatures: {
      rivers: ['Nile River'],
      mountains: ['Mount Catherine', 'Mount Sinai'],
      lakes: ['Lake Nasser'],
      deserts: ['Sahara Desert', 'Eastern Desert', 'Western Desert'],
      forests: ['Sinai Peninsula']
    },
    demographics: {
      populationDensity: 103,
      urbanization: 42.7,
      ageDistribution: {
        under15: 33.6,
        between15and64: 60.6,
        over65: 5.8
      },
      lifeExpectancy: 72.0,
      literacyRate: 71.2
    }
  },
  {
    code: 'TR',
    name: 'Turkey',
    city: 'Istanbul',
    timezone: 'Europe/Istanbul',
    lat: 41.0082,
    lon: 28.9784,
    population: 84339067,
    region: 'Asia',
    subregion: 'Western Asia',
    currency: 'TRY',
    language: 'Turkish',
    flag: '🇹🇷',
    capital: 'Ankara',
    area: 783562,
    borders: ['ARM', 'AZE', 'BGR', 'GEO', 'GRC', 'IRN', 'IRQ', 'SYR'],
    callingCode: '+90',
    topLevelDomain: '.tr',
    alpha2Code: 'TR',
    alpha3Code: 'TUR',
    nativeName: 'Türkiye',
    numericCode: '792',
    cioc: 'TUR',
    demonym: 'Turkish',
    gini: 41.9,
    continent: 'Asia',
    climateZone: 'Mediterranean',
    isCoastal: true,
    averageElevation: 1132,
    majorIndustries: ['Tourism', 'Manufacturing', 'Agriculture', 'Mining'],
    touristAttractions: ['Hagia Sophia', 'Cappadocia', 'Pamukkale', 'Ephesus'],
    culturalHighlights: ['Ottoman Empire', 'Turkish Delight', 'Whirling Dervishes', 'Turkish Bath'],
    economicIndicators: {
      gdp: 761425000000,
      gdpPerCapita: 9030,
      unemploymentRate: 13.2,
      inflationRate: 19.6,
      exports: ['Machinery', 'Textiles', 'Food', 'Vehicles'],
      imports: ['Machinery', 'Chemicals', 'Fuels', 'Electronics']
    },
    geographicFeatures: {
      rivers: ['Euphrates', 'Tigris', 'Kızılırmak', 'Sakarya'],
      mountains: ['Mount Ararat', 'Taurus Mountains', 'Pontic Mountains'],
      lakes: ['Lake Van', 'Lake Tuz', 'Lake Eğirdir'],
      deserts: [],
      forests: ['Black Sea Forests', 'Mediterranean Forests']
    },
    demographics: {
      populationDensity: 108,
      urbanization: 75.1,
      ageDistribution: {
        under15: 23.4,
        between15and64: 68.6,
        over65: 8.0
      },
      lifeExpectancy: 77.7,
      literacyRate: 96.2
    }
  },
  {
    code: 'TH',
    name: 'Thailand',
    city: 'Bangkok',
    timezone: 'Asia/Bangkok',
    lat: 13.7563,
    lon: 100.5018,
    population: 69799978,
    region: 'Asia',
    subregion: 'South-Eastern Asia',
    currency: 'THB',
    language: 'Thai',
    flag: '🇹🇭',
    capital: 'Bangkok',
    area: 513120,
    borders: ['MMR', 'KHM', 'LAO', 'MYS'],
    callingCode: '+66',
    topLevelDomain: '.th',
    alpha2Code: 'TH',
    alpha3Code: 'THA',
    nativeName: 'ประเทศไทย',
    numericCode: '764',
    cioc: 'THA',
    demonym: 'Thai',
    gini: 36.4,
    continent: 'Asia',
    climateZone: 'Tropical',
    isCoastal: true,
    averageElevation: 287,
    majorIndustries: ['Tourism', 'Manufacturing', 'Agriculture', 'Services'],
    touristAttractions: ['Grand Palace', 'Wat Pho', 'Phuket', 'Chiang Mai'],
    culturalHighlights: ['Buddhism', 'Thai Cuisine', 'Muay Thai', 'Festivals'],
    economicIndicators: {
      gdp: 543776000000,
      gdpPerCapita: 7810,
      unemploymentRate: 1.2,
      inflationRate: 0.7,
      exports: ['Electronics', 'Machinery', 'Vehicles', 'Rubber'],
      imports: ['Machinery', 'Electronics', 'Fuels', 'Chemicals']
    },
    geographicFeatures: {
      rivers: ['Chao Phraya', 'Mekong', 'Mae Ping'],
      mountains: ['Doi Inthanon', 'Khao Yai', 'Phu Kradueng'],
      lakes: ['Lake Songkhla', 'Bueng Boraphet'],
      deserts: [],
      forests: ['Tropical Rainforest', 'Deciduous Forest', 'Mangrove Forest']
    },
    demographics: {
      populationDensity: 137,
      urbanization: 50.4,
      ageDistribution: {
        under15: 16.9,
        between15and64: 70.8,
        over65: 12.3
      },
      lifeExpectancy: 77.2,
      literacyRate: 96.7
    }
  }
];

const EXPANDED_FLAG_EMOJIS: { [key: string]: string } = {
  'US': '🇺🇸', 'GB': '🇬🇧', 'DE': '🇩🇪', 'FR': '🇫🇷', 'IT': '🇮🇹',
  'ES': '🇪🇸', 'JP': '🇯🇵', 'CN': '🇨🇳', 'IN': '🇮🇳', 'BR': '🇧🇷',
  'CA': '🇨🇦', 'AU': '🇦🇺', 'RU': '🇷🇺', 'KR': '🇰🇷', 'MX': '🇲🇽',
  'AR': '🇦🇷', 'ZA': '🇿🇦', 'EG': '🇪🇬', 'TR': '🇹🇷', 'TH': '🇹🇭'
};

const WEATHER_CONDITIONS = {
  'sunny': { icon: Sun, color: 'text-yellow-400', bg: 'bg-yellow-400/20' },
  'clear': { icon: Sun, color: 'text-yellow-400', bg: 'bg-yellow-400/20' },
  'cloudy': { icon: Cloud, color: 'text-gray-400', bg: 'bg-gray-400/20' },
  'rainy': { icon: CloudRain, color: 'text-blue-400', bg: 'bg-blue-400/20' },
  'snowy': { icon: CloudSnow, color: 'text-blue-200', bg: 'bg-blue-200/20' },
  'stormy': { icon: Zap, color: 'text-purple-400', bg: 'bg-purple-400/20' }
};

const CHART_COLORS = [
  '#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff00', '#ff00ff',
  '#00ffff', '#ffff00', '#ff8042', '#0088fe', '#00c49f', '#ffbb28',
  '#ff8042', '#8dd1e1', '#d084d0', '#87d068', '#ffc0cb', '#dda0dd',
  '#98fb98', '#f0e68c', '#ff6347', '#40e0d0', '#ee82ee', '#90ee90'
];

const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  },
  item: {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  },
  card: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: { 
      scale: 1.02, 
      y: -5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    },
    tap: { 
      scale: 0.98,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  },
  modal: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    }
  }
};

// ==================== ADVANCED WEATHER SERVICE ====================
class AdvancedWeatherService {
  private cache: Map<string, any> = new Map();
  private requestQueue: Array<{ city: string; resolve: Function; reject: Function }> = [];
  private isProcessing = false;
  private rateLimitDelay = 1000; // 1 second between requests
  private retryAttempts = 3;
  private requestTimeout = 10000; // 10 seconds

  constructor() {
    this.initializeService();
  }

  private initializeService() {
    // Initialize service with default configurations
    this.setupErrorHandling();
    this.setupCacheCleanup();
    this.setupNetworkMonitoring();
  }

  private setupErrorHandling() {
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      this.handleError(event.reason);
    });

    window.addEventListener('error', (event) => {
      console.error('Global error:', event.error);
      this.handleError(event.error);
    });
  }

  private setupCacheCleanup() {
    // Clean cache every hour
    setInterval(() => {
      this.cleanupCache();
    }, 60 * 60 * 1000);
  }

  private setupNetworkMonitoring() {
    window.addEventListener('online', () => {
      console.log('Network connection restored');
      this.processRequestQueue();
    });

    window.addEventListener('offline', () => {
      console.log('Network connection lost');
    });
  }

  private handleError(error: any) {
    // Centralized error handling
    console.error('Weather service error:', error);
    
    // Log error to analytics service
    this.logErrorToAnalytics(error);
    
    // Show user-friendly error message
    this.showErrorNotification(error);
  }

  private logErrorToAnalytics(error: any) {
    // Mock analytics logging
    console.log('Logging error to analytics:', error);
  }

  private showErrorNotification(error: any) {
    // Mock notification system
    console.log('Showing error notification:', error);
  }

  private cleanupCache() {
    const maxAge = 60 * 60 * 1000; // 1 hour
    const now = Date.now();
    
    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp > maxAge) {
        this.cache.delete(key);
      }
    }
  }

  private async processRequestQueue() {
    if (this.isProcessing || this.requestQueue.length === 0) return;
    
    this.isProcessing = true;
    
    while (this.requestQueue.length > 0) {
      const request = this.requestQueue.shift();
      if (request) {
        try {
          const data = await this.fetchWeatherDataInternal(request.city);
          request.resolve(data);
        } catch (error) {
          request.reject(error);
        }
        
        // Rate limiting
        await new Promise(resolve => setTimeout(resolve, this.rateLimitDelay));
      }
    }
    
    this.isProcessing = false;
  }

  private generateComprehensiveMockData(city: string): ComprehensiveWeatherData {
    const baseTemp = Math.floor(Math.random() * 35) + 5;
    const conditions = ['Sunny', 'Cloudy', 'Rainy', 'Clear', 'Snowy', 'Stormy'];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    
    const hourlyData: DetailedHourlyForecast[] = Array.from({ length: 24 }, (_, i) => ({
      time: i,
      datetime: new Date(Date.now() + i * 60 * 60 * 1000),
      temperature: baseTemp + Math.floor(Math.random() * 10) - 5,
      feelsLike: baseTemp + Math.floor(Math.random() * 8) - 4,
      condition: condition,
      description: `${condition} weather with comfortable conditions`,
      icon: condition.toLowerCase(),
      humidity: Math.floor(Math.random() * 40) + 30,
      windSpeed: Math.floor(Math.random() * 20) + 5,
      windDirection: Math.floor(Math.random() * 360),
      windGust: Math.floor(Math.random() * 30) + 10,
      pressure: Math.floor(Math.random() * 50) + 1000,
      visibility: Math.floor(Math.random() * 15) + 5,
      uvIndex: Math.floor(Math.random() * 10) + 1,
      cloudCover: Math.floor(Math.random() * 100),
      dewPoint: baseTemp - Math.floor(Math.random() * 10),
      precipitation: Math.random() * 5,
      precipitationProbability: Math.floor(Math.random() * 100),
      precipitationType: Math.random() > 0.7 ? 'rain' : 'none',
      airQuality: {
        aqi: Math.floor(Math.random() * 300) + 1,
        co: Math.random() * 10,
        no2: Math.random() * 100,
        o3: Math.random() * 200,
        so2: Math.random() * 50,
        pm25: Math.random() * 50,
        pm10: Math.random() * 100
      },
      solarRadiation: Math.random() * 1000,
      moonPhase: Math.random(),
      sunrise: new Date(Date.now() + 6 * 60 * 60 * 1000),
      sunset: new Date(Date.now() + 18 * 60 * 60 * 1000),
      moonrise: new Date(Date.now() + 20 * 60 * 60 * 1000),
      moonset: new Date(Date.now() + 8 * 60 * 60 * 1000),
      weatherAlerts: [],
      comfort: {
        heatIndex: baseTemp + Math.floor(Math.random() * 5),
        windChill: baseTemp - Math.floor(Math.random() * 5),
        discomfortIndex: Math.floor(Math.random() * 10)
      },
      agriculture: {
        soilMoisture: Math.random() * 100,
        evapotranspiration: Math.random() * 10,
        growingDegreeDays: Math.random() * 30
      }
    }));

    const dailyData: ExtendedDailyForecast[] = Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() + i * 24 * 60 * 60 * 1000),
      dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date(Date.now() + i * 24 * 60 * 60 * 1000).getDay()],
      maxTemp: baseTemp + Math.floor(Math.random() * 8),
      minTemp: baseTemp - Math.floor(Math.random() * 8),
      avgTemp: baseTemp,
      condition: condition,
      description: `${condition} weather expected`,
      icon: condition.toLowerCase(),
      humidity: Math.floor(Math.random() * 40) + 30,
      windSpeed: Math.floor(Math.random() * 20) + 5,
      windDirection: Math.floor(Math.random() * 360),
      pressure: Math.floor(Math.random() * 50) + 1000,
      visibility: Math.floor(Math.random() * 15) + 5,
      uvIndex: Math.floor(Math.random() * 10) + 1,
      cloudCover: Math.floor(Math.random() * 100),
      sunrise: new Date(Date.now() + i * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000),
      sunset: new Date(Date.now() + i * 24 * 60 * 60 * 1000 + 18 * 60 * 60 * 1000      ),
      moonPhase: Math.random(),
      precipitation: Math.random() * 5,
      precipitationProbability: Math.floor(Math.random() * 100),
      precipitationType: Math.random() > 0.7 ? 'rain' : 'none',
      hourlyData: hourlyData.slice(i * 3, (i * 3) + 3),
      extremes: {
        maxWindSpeed: Math.floor(Math.random() * 40) + 20,
        minVisibility: Math.floor(Math.random() * 5) + 1,
        maxUvIndex: Math.floor(Math.random() * 5) + 8,
        maxPrecipitation: Math.random() * 10
      },
      comfort: {
        avgHeatIndex: baseTemp + Math.floor(Math.random() * 5),
        avgWindChill: baseTemp - Math.floor(Math.random() * 5),
        comfortRating: Math.floor(Math.random() * 10) + 1
      },
      suitability: {
        outdoor: Math.floor(Math.random() * 10) + 1,
        sports: Math.floor(Math.random() * 10) + 1,
        travel: Math.floor(Math.random() * 10) + 1,
        agriculture: Math.floor(Math.random() * 10) + 1
      }
    }));

    return {
      location: {
        city: city,
        country: 'Mock Country',
        region: 'Mock Region',
        lat: Math.random() * 180 - 90,
        lon: Math.random() * 360 - 180,
        timezone: 'UTC',
        localtime: new Date(),
        utcOffset: Math.floor(Math.random() * 24) - 12
      },
      current: {
        temperature: baseTemp,
        feelsLike: baseTemp + Math.floor(Math.random() * 6) - 3,
        condition: condition,
        description: `Current ${condition.toLowerCase()} conditions`,
        icon: condition.toLowerCase(),
        humidity: Math.floor(Math.random() * 40) + 30,
        windSpeed: Math.floor(Math.random() * 20) + 5,
        windDirection: Math.floor(Math.random() * 360),
        windGust: Math.floor(Math.random() * 30) + 10,
        pressure: Math.floor(Math.random() * 50) + 1000,
        visibility: Math.floor(Math.random() * 15) + 5,
        uvIndex: Math.floor(Math.random() * 10) + 1,
        cloudCover: Math.floor(Math.random() * 100),
        dewPoint: baseTemp - Math.floor(Math.random() * 10),
        precipitation: Math.random() * 5,
        isDay: new Date().getHours() > 6 && new Date().getHours() < 18,
        lastUpdated: new Date()
      },
      forecast: {
        hourly: hourlyData,
        daily: dailyData
      },
      historical: {
        temperature: Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
          value: baseTemp + Math.floor(Math.random() * 10) - 5
        })),
        humidity: Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
          value: Math.floor(Math.random() * 40) + 30
        })),
        pressure: Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
          value: Math.floor(Math.random() * 50) + 1000
        })),
        precipitation: Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
          value: Math.random() * 10
        }))
      },
      statistics: {
        temperature: {
          min: baseTemp - 10,
          max: baseTemp + 10,
          avg: baseTemp,
          median: baseTemp,
          mode: baseTemp,
          stdDev: 5
        },
        humidity: {
          min: 20,
          max: 90,
          avg: 55,
          median: 55,
          mode: 50,
          stdDev: 15
        },
        pressure: {
          min: 980,
          max: 1050,
          avg: 1015,
          median: 1015,
          mode: 1013,
          stdDev: 20
        },
        windSpeed: {
          min: 0,
          max: 50,
          avg: 15,
          median: 12,
          mode: 10,
          stdDev: 8
        }
      },
      airQuality: {
        aqi: Math.floor(Math.random() * 300) + 1,
        category: ['Good', 'Moderate', 'Unhealthy for Sensitive Groups', 'Unhealthy'][Math.floor(Math.random() * 4)],
        dominantPollutant: ['PM2.5', 'PM10', 'O3', 'NO2'][Math.floor(Math.random() * 4)],
        components: {
          co: Math.random() * 10,
          no2: Math.random() * 100,
          o3: Math.random() * 200,
          so2: Math.random() * 50,
          pm25: Math.random() * 50,
          pm10: Math.random() * 100
        },
        forecast: Array.from({ length: 5 }, (_, i) => ({
          date: new Date(Date.now() + i * 24 * 60 * 60 * 1000),
          aqi: Math.floor(Math.random() * 300) + 1,
          category: ['Good', 'Moderate', 'Unhealthy for Sensitive Groups', 'Unhealthy'][Math.floor(Math.random() * 4)],
          components: {
            co: Math.random() * 10,
            no2: Math.random() * 100,
            o3: Math.random() * 200,
            so2: Math.random() * 50,
            pm25: Math.random() * 50,
            pm10: Math.random() * 100
          }
        }))
      },
      astronomy: {
        sunrise: new Date(Date.now() + 6 * 60 * 60 * 1000),
        sunset: new Date(Date.now() + 18 * 60 * 60 * 1000),
        moonrise: new Date(Date.now() + 20 * 60 * 60 * 1000),
        moonset: new Date(Date.now() + 8 * 60 * 60 * 1000),
        moonPhase: Math.random(),
        moonIllumination: Math.random() * 100,
        moonAge: Math.floor(Math.random() * 29),
        moonSign: ['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous', 'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'][Math.floor(Math.random() * 8)],
        sunPosition: {
          azimuth: Math.random() * 360,
          elevation: Math.random() * 90
        },
        moonPosition: {
          azimuth: Math.random() * 360,
          elevation: Math.random() * 90
        },
        solarNoon: new Date(Date.now() + 12 * 60 * 60 * 1000),
        civilTwilightBegin: new Date(Date.now() + 5.5 * 60 * 60 * 1000),
        civilTwilightEnd: new Date(Date.now() + 18.5 * 60 * 60 * 1000),
        nauticalTwilightBegin: new Date(Date.now() + 5 * 60 * 60 * 1000),
        nauticalTwilightEnd: new Date(Date.now() + 19 * 60 * 60 * 1000),
        astronomicalTwilightBegin: new Date(Date.now() + 4.5 * 60 * 60 * 1000),
        astronomicalTwilightEnd: new Date(Date.now() + 19.5 * 60 * 60 * 1000),
        dayLength: 12 * 60 * 60,
        nightLength: 12 * 60 * 60
      },
      marine: {
        seaTemperature: baseTemp + Math.floor(Math.random() * 5) - 2,
        waveHeight: Math.random() * 5,
        waveDirection: Math.floor(Math.random() * 360),
        wavePeriod: Math.random() * 20 + 5,
        swellHeight: Math.random() * 3,
        swellDirection: Math.floor(Math.random() * 360),
        swellPeriod: Math.random() * 15 + 5,
        tideHeight: Math.random() * 6,
        tideDirection: Math.random() > 0.5 ? 'rising' : 'falling',
        nextHighTide: new Date(Date.now() + 6 * 60 * 60 * 1000),
        nextLowTide: new Date(Date.now() + 12 * 60 * 60 * 1000),
        visibility: Math.floor(Math.random() * 15) + 5,
        currentSpeed: Math.random() * 5,
        currentDirection: Math.floor(Math.random() * 360)
      },
      agriculture: {
        soilTemperature: baseTemp + Math.floor(Math.random() * 5) - 2,
        soilMoisture: Math.random() * 100,
        evapotranspiration: Math.random() * 10,
        growingDegreeDays: Math.random() * 30,
        chillHours: Math.random() * 1000,
        leafWetness: Math.random() * 100,
        frostProbability: Math.random() * 100,
        heatStress: Math.random() * 10,
        recommendations: [
          'Optimal conditions for planting',
          'Monitor soil moisture levels',
          'Consider irrigation scheduling',
          'Watch for pest activity'
        ]
      },
      health: {
        heatIndex: baseTemp + Math.floor(Math.random() * 10),
        windChill: baseTemp - Math.floor(Math.random() * 10),
        discomfortIndex: Math.floor(Math.random() * 10),
        airQualityHealth: ['Good', 'Moderate', 'Unhealthy for Sensitive Groups'][Math.floor(Math.random() * 3)],
        uvExposure: ['Low', 'Moderate', 'High', 'Very High'][Math.floor(Math.random() * 4)],
        pollenForecast: {
          tree: Math.floor(Math.random() * 10),
          grass: Math.floor(Math.random() * 10),
          weed: Math.floor(Math.random() * 10),
          mold: Math.floor(Math.random() * 10),
          overall: Math.floor(Math.random() * 10)
        },
        recommendations: [
          'Stay hydrated',
          'Use sunscreen',
          'Limit outdoor activities during peak hours',
          'Monitor air quality'
        ]
      },
      energy: {
        solarPotential: Math.random() * 100,
        windPotential: Math.random() * 100,
        heatingDegreeDays: Math.max(0, 18 - baseTemp),
        coolingDegreeDays: Math.max(0, baseTemp - 18),
        energyConsumptionForecast: {
          heating: Math.random() * 100,
          cooling: Math.random() * 100,
          lighting: Math.random() * 100,
          overall: Math.random() * 100
        }
      },
      transportation: {
        roadConditions: ['Excellent', 'Good', 'Fair', 'Poor'][Math.floor(Math.random() * 4)],
        visibility: Math.floor(Math.random() * 15) + 5,
        windImpact: ['None', 'Low', 'Moderate', 'High'][Math.floor(Math.random() * 4)],
        precipitationImpact: ['None', 'Low', 'Moderate', 'High'][Math.floor(Math.random() * 4)],
        temperatureImpact: ['None', 'Low', 'Moderate', 'High'][Math.floor(Math.random() * 4)],
        drivingDifficulty: Math.floor(Math.random() * 10),
        flightDelayProbability: Math.random() * 100,
        marineConditions: ['Calm', 'Moderate', 'Rough'][Math.floor(Math.random() * 3)],
        recommendations: [
          'Normal driving conditions',
          'Check road conditions before travel',
          'Allow extra time for journey'
        ]
      },
      recreation: {
        beachConditions: ['Excellent', 'Good', 'Fair', 'Poor'][Math.floor(Math.random() * 4)],
        skiConditions: ['Powder', 'Fresh', 'Packed', 'Icy'][Math.floor(Math.random() * 4)],
        hikingConditions: ['Excellent', 'Good', 'Fair', 'Poor'][Math.floor(Math.random() * 4)],
        campingConditions: ['Excellent', 'Good', 'Fair', 'Poor'][Math.floor(Math.random() * 4)],
        golfConditions: ['Excellent', 'Good', 'Fair', 'Poor'][Math.floor(Math.random() * 4)],
        outdoorComfort: Math.floor(Math.random() * 10),
        suitability: {
          beach: Math.floor(Math.random() * 10),
          hiking: Math.floor(Math.random() * 10),
          camping: Math.floor(Math.random() * 10),
          golf: Math.floor(Math.random() * 10),
          cycling: Math.floor(Math.random() * 10),
          running: Math.floor(Math.random() * 10),
          picnic: Math.floor(Math.random() * 10),
          festivals: Math.floor(Math.random() * 10)
        }
      },
      alerts: [],
      trends: {
        temperature: ['rising', 'falling', 'stable'][Math.floor(Math.random() * 3)] as 'rising' | 'falling' | 'stable',
        pressure: ['rising', 'falling', 'stable'][Math.floor(Math.random() * 3)] as 'rising' | 'falling' | 'stable',
        humidity: ['rising', 'falling', 'stable'][Math.floor(Math.random() * 3)] as 'rising' | 'falling' | 'stable',
        windSpeed: ['increasing', 'decreasing', 'stable'][Math.floor(Math.random() * 3)] as 'increasing' | 'decreasing' | 'stable',
        conditions: ['improving', 'deteriorating', 'stable'][Math.floor(Math.random() * 3)] as 'improving' | 'deteriorating' | 'stable'
      },
      confidence: {
        temperature: Math.random() * 100,
        precipitation: Math.random() * 100,
        windSpeed: Math.random() * 100,
        overall: Math.random() * 100
      },
      metadata: {
        provider: 'Advanced Weather Service',
        model: 'GFS',
        resolution: '0.25°',
        updateFrequency: '6 hours',
        lastUpdate: new Date(),
        nextUpdate: new Date(Date.now() + 6 * 60 * 60 * 1000),
        dataQuality: Math.random() * 100,
        coverage: 'Global',
        accuracy: {
          temperature: Math.random() * 100,
          precipitation: Math.random() * 100,
          windSpeed: Math.random() * 100,
          humidity: Math.random() * 100
        }
      }
    };
  }

  private async fetchWeatherDataInternal(city: string): Promise<ComprehensiveWeatherData> {
    // Check cache first
    const cacheKey = `weather_${city}`;
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < 30 * 60 * 1000) { // 30 minutes cache
      return cached.data;
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 500));

    // Generate comprehensive mock data
    const data = this.generateComprehensiveMockData(city);

    // Cache the result
    this.cache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });

    return data;
  }

  async getWeatherData(city: string): Promise<ComprehensiveWeatherData> {
    return new Promise((resolve, reject) => {
      // Add to request queue
      this.requestQueue.push({ city, resolve, reject });
      this.processRequestQueue();
    });
  }

  async getBatchWeatherData(cities: string[]): Promise<{ [city: string]: ComprehensiveWeatherData }> {
    const promises = cities.map(city => this.getWeatherData(city));
    const results = await Promise.allSettled(promises);
    
    const weatherData: { [city: string]: ComprehensiveWeatherData } = {};
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        weatherData[cities[index]] = result.value;
      }
    });
    
    return weatherData;
  }

  getCacheStats() {
    return {
      size: this.cache.size,
      entries: Array.from(this.cache.keys())
    };
  }

  clearCache() {
    this.cache.clear();
  }
}

// ==================== UTILITY FUNCTIONS ====================
const getFlagEmoji = (countryCode: string): string => {
  return EXPANDED_FLAG_EMOJIS[countryCode] || '🌍';
};

const getWeatherIcon = (condition: string) => {
  const conditionData = WEATHER_CONDITIONS[condition.toLowerCase() as keyof typeof WEATHER_CONDITIONS];
  if (conditionData) {
    const IconComponent = conditionData.icon;
    return <IconComponent className={`w-8 h-8 ${conditionData.color}`} />;
  }
  return <Sun className="w-8 h-8 text-yellow-400" />;
};

const formatTemperature = (temp: number, unit: 'celsius' | 'fahrenheit' | 'kelvin' = 'celsius'): string => {
  switch (unit) {
    case 'fahrenheit':
      return `${Math.round(temp * 9/5 + 32)}°F`;
    case 'kelvin':
      return `${Math.round(temp + 273.15)}K`;
    default:
      return `${Math.round(temp)}°C`;
  }
};

const formatTime = (date: Date, format: '12h' | '24h' = '24h'): string => {
  if (format === '12h') {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  }
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });
};

const formatDate = (date: Date, format: 'dd/mm/yyyy' | 'mm/dd/yyyy' | 'yyyy-mm-dd' = 'dd/mm/yyyy'): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  switch (format) {
    case 'mm/dd/yyyy':
      return `${month}/${day}/${year}`;
    case 'yyyy-mm-dd':
      return `${year}-${month}-${day}`;
    default:
      return `${day}/${month}/${year}`;
  }
};

const calculateWindDirection = (degrees: number): string => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

const getAirQualityColor = (aqi: number): string => {
  if (aqi <= 50) return 'text-green-400';
  if (aqi <= 100) return 'text-yellow-400';
  if (aqi <= 150) return 'text-orange-400';
  if (aqi <= 200) return 'text-red-400';
  if (aqi <= 300) return 'text-purple-400';
  return 'text-red-600';
};

const getUVIndexColor = (uvIndex: number): string => {
  if (uvIndex <= 2) return 'text-green-400';
  if (uvIndex <= 5) return 'text-yellow-400';
  if (uvIndex <= 7) return 'text-orange-400';
  if (uvIndex <= 10) return 'text-red-400';
  return 'text-purple-400';
};

const calculateStatistics = (values: number[]) => {
  const sorted = [...values].sort((a, b) => a - b);
  const sum = values.reduce((acc, val) => acc + val, 0);
  const mean = sum / values.length;
  
  return {
    min: Math.min(...values),
    max: Math.max(...values),
    avg: mean,
    median: sorted.length % 2 === 0 
      ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
      : sorted[Math.floor(sorted.length / 2)],
    sum,
    count: values.length,
    stdDev: Math.sqrt(values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / values.length)
  };
};

// ==================== ADVANCED COMPONENTS ====================

// Enhanced Loading Spinner with multiple states
const AdvancedLoadingSpinner: React.FC<{
  size?: 'small' | 'medium' | 'large';
  type?: 'spinner' | 'dots' | 'bars' | 'pulse';
  color?: string;
  message?: string;
}> = ({ 
  size = 'medium', 
  type = 'spinner', 
  color = 'white', 
  message = 'Loading...' 
}) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-16 h-16',
    large: 'w-24 h-24'
  };

  const renderSpinner = () => {
    switch (type) {
      case 'dots':
        return (
          <div className="flex space-x-2">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                className={`w-3 h-3 bg-${color} rounded-full`}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        );
      
      case 'bars':
        return (
          <div className="flex space-x-1 items-end">
            {[0, 1, 2, 3, 4].map(i => (
              <motion.div
                key={i}
                className={`w-2 bg-${color}`}
                animate={{
                  height: [20, 40, 20]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}
          </div>
        );

      case 'pulse':
        return (
          <motion.div
            className={`${sizeClasses[size]} bg-${color} rounded-full`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          />
        );

      default:
        return (
          <motion.div
            className={`${sizeClasses[size]} border-4 border-${color}/20 border-t-${color} rounded-full`}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      {renderSpinner()}
      {message && (
        <motion.p 
          className={`text-${color} text-sm font-medium`}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {message}
        </motion.p>
      )}
    </div>
  );
};

// Enhanced Search Bar with autocomplete and suggestions
const AdvancedSearchBar: React.FC<{
  value: string;
  onChange: (value: string) => void;
  onSelect?: (value: string) => void;
  placeholder: string;
  suggestions?: string[];
  showHistory?: boolean;
  history?: string[];
  className?: string;
}> = ({ 
  value, 
  onChange, 
  onSelect, 
  placeholder, 
  suggestions = [], 
  showHistory = false,
  history = [],
  className = '' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const filtered = suggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    ).slice(0, 5);
    setFilteredSuggestions(filtered);
  }, [value, suggestions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    onSelect?.(selectedValue);
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (filteredSuggestions.length > 0 || (showHistory && history.length > 0)) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto"
          >
            {filteredSuggestions.length > 0 && (
              <div className="p-2">
                <div className="text-xs text-white/60 px-3 py-2 font-semibold">Suggestions</div>
                {filteredSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelect(suggestion)}
                    className="w-full text-left px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Search className="w-4 h-4 text-white/40" />
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
            
            {showHistory && history.length > 0 && (
              <div className="p-2 border-t border-white/10">
                <div className="text-xs text-white/60 px-3 py-2 font-semibold">Recent Searches</div>
                {history.slice(0, 3).map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelect(item)}
                    className="w-full text-left px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Clock className="w-4 h-4 text-white/40" />
                    {item}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Advanced Mini Chart with multiple chart types
const AdvancedMiniChart: React.FC<{
  data: any[];
  type?: 'area' | 'line' | 'bar';
  color?: string;
  height?: number;
  showAxis?: boolean;
  showTooltip?: boolean;
  dataKey: string;
  xDataKey?: string;
}> = ({ 
  data, 
  type = 'area', 
  color = '#60a5fa', 
  height = 80,
  showAxis = false,
  showTooltip = true,
  dataKey,
  xDataKey = 'time'
}) => {
  const ChartComponent = type === 'bar' ? BarChart : type === 'line' ? RechartsLineChart : AreaChart;

  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ChartComponent data={data}>
          {showAxis && <XAxis dataKey={xDataKey} hide />}
          {showAxis && <YAxis hide />}
          {showTooltip && (
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0,0,0,0.8)',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontSize: '12px'
              }}
            />
          )}
          
          {type === 'area' && (
            <>
              <Area
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                fill={`url(#gradient-${dataKey})`}
                strokeWidth={2}
              />
              <defs>
                <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
            </>
          )}
          
          {type === 'line' && (
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              dot={false}
            />
          )}
          
          {type === 'bar' && (
            <Bar
              dataKey={dataKey}
              fill={color}
              radius={[2, 2, 0, 0]}
            />
          )}
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
};

// Enhanced Weather Card with detailed information
const DetailedWeatherCard: React.FC<{
  country: Country;
  weatherData: ComprehensiveWeatherData;
  onRemove: () => void;
  onExpand?: () => void;
  viewMode: 'grid' | 'list';
  showDetails?: boolean;
  preferences: WeatherPreferences;
}> = ({ 
  country, 
  weatherData, 
  onRemove, 
  onExpand,
  viewMode, 
  showDetails = false,
  preferences 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'current' | 'forecast' | 'details'>('current');

  if (!weatherData) return null;

  const { current, forecast, airQuality, astronomy } = weatherData;

  return (
    <motion.div
      className={`relative bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl overflow-hidden ${
        viewMode === 'list' ? 'flex items-center gap-6' : ''
      } ${isExpanded ? 'col-span-2 row-span-2' : ''}`}
      variants={ANIMATION_VARIANTS.card}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      layout
    >
      {/* Header Controls */}
      <div className="absolute top-2 right-2 flex gap-2 z-10">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-8 h-8 bg-blue-500/20 hover:bg-blue-500/40 rounded-full flex items-center justify-center text-white transition-colors"
        >
          {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
        <button
          onClick={onRemove}
          className="w-8 h-8 bg-red-500/20 hover:bg-red-500/40 rounded-full flex items-center justify-center text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-6">
        {/* Country Header */}
        <div className={`${viewMode === 'list' ? 'flex-shrink-0' : 'mb-4'}`}>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{getFlagEmoji(country.code)}</span>
            <div>
              <h3 className="text-xl font-bold text-white">{country.name}</h3>
              <p className="text-sm text-gray-300 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {country.city}
              </p>
              <p className="text-xs text-gray-400">
                {formatTime(current.lastUpdated, preferences.timeFormat)}
              </p>
            </div>
          </div>
        </div>

        {/* Main Weather Display */}
        <div className={`${viewMode === 'list' ? 'flex-1 flex items-center gap-8' : ''}`}>
          <div className={`${viewMode === 'list' ? 'flex items-center gap-6' : 'text-center mb-6'}`}>
            <div className="relative">
              {getWeatherIcon(current.condition)}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
            </div>
            
            <div>
              <div className="text-4xl font-bold text-white mb-1">
                {formatTemperature(current.temperature, preferences.temperatureUnit)}
              </div>
              <div className="text-sm text-gray-300 capitalize mb-1">
                {current.description}
              </div>
              <div className="text-xs text-gray-400">
                Feels like {formatTemperature(current.feelsLike, preferences.temperatureUnit)}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className={`grid ${viewMode === 'list' ? 'grid-cols-4' : 'grid-cols-2'} gap-4 mb-4`}>
            <div className="flex items-center gap-2">
              <Wind className="w-4 h-4 text-blue-400" />
              <div>
                <div className="text-xs text-gray-300">Wind</div>
                <div className="text-white font-semibold">
                  {current.windSpeed} km/h
                </div>
                <div className="text-xs text-gray-400">
                  {calculateWindDirection(current.windDirection)}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-blue-400" />
              <div>
                <div className="text-xs text-gray-300">Humidity</div>
                <div className="text-white font-semibold">{current.humidity}%</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-green-400" />
              <div>
                <div className="text-xs text-gray-300">Pressure</div>
                <div className="text-white font-semibold">{current.pressure} hPa</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-purple-400" />
              <div>
                <div className="text-xs text-gray-300">Visibility</div>
                <div className="text-white font-semibold">{current.visibility} km</div>
              </div>
            </div>
          </div>

          {/* Air Quality */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-300">Air Quality</span>
              <span className={`text-sm font-semibold ${getAirQualityColor(airQuality.aqi)}`}>
                AQI {airQuality.aqi}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  airQuality.aqi <= 50 ? 'bg-green-400' :
                  airQuality.aqi <= 100 ? 'bg-yellow-400' :
                  airQuality.aqi <= 150 ? 'bg-orange-400' :
                  airQuality.aqi <= 200 ? 'bg-red-400' :
                  'bg-purple-400'
                }`}
                style={{ width: `${Math.min(airQuality.aqi / 300 * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* UV Index */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-300">UV Index</span>
              <span className={`text-sm font-semibold ${getUVIndexColor(current.uvIndex)}`}>
                {current.uvIndex}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  current.uvIndex <= 2 ? 'bg-green-400' :
                  current.uvIndex <= 5 ? 'bg-yellow-400' :
                  current.uvIndex <= 7 ? 'bg-orange-400' :
                  current.uvIndex <= 10 ? 'bg-red-400' :
                  'bg-purple-400'
                }`}
                style={{ width: `${Math.min(current.uvIndex / 11 * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Expanded Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6"
              >
                {/* Tab Navigation */}
                <div className="flex border-b border-white/20 mb-4">
                  {[
                    { key: 'current', label: 'Current', icon: Thermometer },
                    { key: 'forecast', label: 'Forecast', icon: Calendar },
                    { key: 'details', label: 'Details', icon: Info }
                  ].map(({ key, label, icon: Icon }) => (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key as any)}
                      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                        activeTab === key
                          ? 'text-blue-400 border-b-2 border-blue-400'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                  {activeTab === 'current' && (
                    <motion.div
                      key="current"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      {/* Current Conditions Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="bg-white/5 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Thermometer className="w-4 h-4 text-red-400" />
                            <span className="text-sm text-gray-300">Heat Index</span>
                          </div>
                          <div className="text-lg font-semibold text-white">
                            {formatTemperature(weatherData.health.heatIndex, preferences.temperatureUnit)}
                          </div>
                        </div>

                        <div className="bg-white/5 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Wind className="w-4 h-4 text-blue-400" />
                            <span className="text-sm text-gray-300">Wind Chill</span>
                          </div>
                          <div className="text-lg font-semibold text-white">
                            {formatTemperature(weatherData.health.windChill, preferences.temperatureUnit)}
                          </div>
                        </div>

                        <div className="bg-white/5 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Droplets className="w-4 h-4 text-blue-400" />
                            <span className="text-sm text-gray-300">Dew Point</span>
                          </div>
                          <div className="text-lg font-semibold text-white">
                            {formatTemperature(current.dewPoint, preferences.temperatureUnit)}
                          </div>
                        </div>

                        <div className="bg-white/5 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Cloud className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-300">Cloud Cover</span>
                          </div>
                          <div className="text-lg font-semibold text-white">
                            {current.cloudCover}%
                          </div>
                        </div>

                        <div className="bg-white/5 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Sunrise className="w-4 h-4 text-orange-400" />
                            <span className="text-sm text-gray-300">Sunrise</span>
                          </div>
                          <div className="text-lg font-semibold text-white">
                            {formatTime(astronomy.sunrise, preferences.timeFormat)}
                          </div>
                        </div>

                        <div className="bg-white/5 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Sunset className="w-4 h-4 text-orange-600" />
                            <span className="text-sm text-gray-300">Sunset</span>
                          </div>
                          <div className="text-lg font-semibold text-white">
                            {formatTime(astronomy.sunset, preferences.timeFormat)}
                          </div>
                        </div>
                      </div>

                      {/* Current Trends */}
                      <div className="bg-white/5 rounded-lg p-4">
                        <h4 className="text-sm font-semibold text-white mb-3">Current Trends</h4>
                        <div className="grid grid-cols-2 gap-4">
                          {Object.entries(weatherData.trends).map(([key, trend]) => (
                            <div key={key} className="flex items-center justify-between">
                              <span className="text-sm text-gray-300 capitalize">{key}</span>
                              <div className="flex items-center gap-1">
                                {trend === 'rising' || trend === 'increasing' || trend === 'improving' ? (
                                  <TrendingUp className="w-4 h-4 text-green-400" />
                                ) : trend === 'falling' || trend === 'decreasing' || trend === 'deteriorating' ? (
                                  <TrendingDown className="w-4 h-4 text-red-400" />
                                ) : (
                                  <div className="w-4 h-4 bg-gray-400 rounded-full" />
                                )}
                                <span className={`text-sm font-medium ${
                                  trend === 'rising' || trend === 'increasing' || trend === 'improving' ? 'text-green-400' :
                                  trend === 'falling' || trend === 'decreasing' || trend === 'deteriorating' ? 'text-red-400' :
                                  'text-gray-400'
                                }`}>
                                  {trend}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'forecast' && (
                    <motion.div
                      key="forecast"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      {/* Hourly Forecast */}
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-3">24-Hour Forecast</h4>
                        <div className="bg-white/5 rounded-lg p-4">
                          <AdvancedMiniChart
                            data={forecast.hourly.slice(0, 24)}
                            type="area"
                            color="#60a5fa"
                            height={120}
                            dataKey="temperature"
                            xDataKey="time"
                            showTooltip={true}
                          />
                        </div>
                      </div>

                      {/* 7-Day Forecast */}
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-3">7-Day Forecast</h4>
                        <div className="space-y-2">
                          {forecast.daily.map((day, index) => (
                            <div key={index} className="bg-white/5 rounded-lg p-3 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-300 w-16">
                                  {index === 0 ? 'Today' : day.dayOfWeek.slice(0, 3)}
                                </span>
                                {getWeatherIcon(day.condition)}
                                <span className="text-sm text-gray-300">{day.description}</span>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="text-right">
                                  <div className="text-white font-semibold">
                                    {formatTemperature(day.maxTemp, preferences.temperatureUnit)}
                                  </div>
                                  <div className="text-gray-400 text-sm">
                                    {formatTemperature(day.minTemp, preferences.temperatureUnit)}
                                  </div>
                                </div>
                                <div className="text-blue-400 text-sm">
                                  {day.precipitationProbability}%
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'details' && (
                    <motion.div
                      key="details"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      {/* Air Quality Details */}
                      <div className="bg-white/5 rounded-lg p-4">
                        <h4 className="text-sm font-semibold text-white mb-3">Air Quality Components</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {Object.entries(airQuality.components).map(([component, value]) => (
                            <div key={component} className="text-center">
                              <div className="text-xs text-gray-300 uppercase mb-1">{component}</div>
                              <div className="text-lg font-semibold text-white">
                                {typeof value === 'number' ? value.toFixed(1) : value}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Astronomy */}
                      <div className="bg-white/5 rounded-lg p-4">
                        <h4 className="text-sm font-semibold text-white mb-3">Astronomy</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center gap-2">
                            <Moon className="w-4 h-4 text-blue-200" />
                            <div>
                              <div className="text-xs text-gray-300">Moon Phase</div>
                              <div className="text-white text-sm">{astronomy.moonSign}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-lg">🌙</span>
                            <div>
                              <div className="text-xs text-gray-300">Illumination</div>
                              <div className="text-white text-sm">{astronomy.moonIllumination.toFixed(0)}%</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Health & Recreation */}
                      <div className="bg-white/5 rounded-lg p-4">
                        <h4 className="text-sm font-semibold text-white mb-3">Activity Recommendations</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {Object.entries(weatherData.recreation.suitability).map(([activity, rating]) => (
                            <div key={activity} className="text-center">
                              <div className="text-xs text-gray-300 capitalize mb-1">{activity}</div>
                              <div className="flex justify-center mb-1">
                                {Array.from({ length: 5 }, (_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3 h-3 ${
                                      i < rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                                    }`}
                                  />
                                ))}
                              </div>
                              <div className="text-xs text-white">{rating}/10</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Data Source Info */}
                      <div className="bg-white/5 rounded-lg p-4">
                        <h4 className="text-sm font-semibold text-white mb-3">Data Information</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-300">Provider:</span>
                            <span className="text-white ml-2">{weatherData.metadata.provider}</span>
                          </div>
                          <div>
                            <span className="text-gray-300">Model:</span>
                            <span className="text-white ml-2">{weatherData.metadata.model}</span>
                          </div>
                          <div>
                            <span className="text-gray-300">Resolution:</span>
                            <span className="text-white ml-2">{weatherData.metadata.resolution}</span>
                          </div>
                          <div>
                            <span className="text-gray-300">Last Update:</span>
                            <span className="text-white ml-2">
                              {formatTime(weatherData.metadata.lastUpdate, preferences.timeFormat)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          <div className="text-xs text-gray-300 mb-2">Data Quality</div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="h-2 bg-green-400 rounded-full transition-all duration-300"
                              style={{ width: `${weatherData.metadata.dataQuality}%` }}
                            />
                          </div>
                          <div className="text-xs text-white mt-1">
                            {weatherData.metadata.dataQuality.toFixed(0)}% Quality
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mini Chart for non-expanded view */}
          {!isExpanded && viewMode === 'grid' && (
            <div className="mt-4">
              <AdvancedMiniChart
                data={forecast.hourly.slice(0, 8)}
                type="area"
                color="#60a5fa"
                dataKey="temperature"
                xDataKey="time"
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Enhanced Country Selector with advanced filtering
const AdvancedCountrySelector: React.FC<{
  countries: Country[];
  selectedCountries: Country[];
  onAddCountry: (country: Country) => void;
  onRemoveCountry: (countryCode: string) => void;
  searchTerm: string;
  filters: {
    region?: string;
    population?: { min: number; max: number };
    climateZone?: string;
  };
  onFilterChange: (filters: any) => void;
}> = ({ 
  countries, 
  selectedCountries, 
  onAddCountry, 
  onRemoveCountry, 
  searchTerm,
  filters,
  onFilterChange 
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'population' | 'region'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const filteredAndSortedCountries = useMemo(() => {
    let filtered = countries.filter(country => {
      const matchesSearch = country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           country.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           country.region.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRegion = !filters.region || country.region === filters.region;
      const matchesClimate = !filters.climateZone || country.climateZone === filters.climateZone;
      const matchesPopulation = !filters.population || 
        (country.population >= filters.population.min && country.population <= filters.population.max);

      return matchesSearch && matchesRegion && matchesClimate && matchesPopulation;
    });

    // Sort countries
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'population':
          aValue = a.population;
          bValue = b.population;
          break;
        case 'region':
          aValue = a.region;
          bValue = b.region;
          break;
        default:
          aValue = a.name;
          bValue = b.name;
          break;
      }

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [countries, searchTerm, filters, sortBy, sortDirection]);

  const regions = useMemo(() => {
    return [...new Set(countries.map(c => c.region))].sort();
  }, [countries]);

  const climateZones = useMemo(() => {
    return [...new Set(countries.map(c => c.climateZone))].sort();
  }, [countries]);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">
          Available Countries ({filteredAndSortedCountries.length})
        </h2>
        
        <div className="flex gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              showFilters ? 'bg-blue-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
          
          <div className="flex bg-white/10 rounded-lg">
            <button
              onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
              className="p-2 text-white hover:bg-white/20 rounded-l-lg transition-colors"
            >
              {sortDirection === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-white text-sm px-3 py-2 focus:outline-none"
            >
              <option value="name">Name</option>
              <option value="population">Population</option>
              <option value="region">Region</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white/5 rounded-lg p-4 mb-4 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Region</label>
                <select
                  value={filters.region || ''}
                  onChange={(e) => onFilterChange({ ...filters, region: e.target.value || undefined })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Regions</option>
                  {regions.map(region => (
                    <option key={region} value={region} className="bg-gray-800">
                      {region}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">Climate Zone</label>
                <select
                  value={filters.climateZone || ''}
                  onChange={(e) => onFilterChange({ ...filters, climateZone: e.target.value || undefined })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Climates</option>
                  {climateZones.map(climate => (
                    <option key={climate} value={climate} className="bg-gray-800">
                      {climate}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">Population</label>
                <select
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '') {
                      onFilterChange({ ...filters, population: undefined });
                    } else {
                      const [min, max] = value.split('-').map(Number);
                      onFilterChange({ ...filters, population: { min, max } });
                    }
                  }}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Populations</option>
                  <option value="0-10000000" className="bg-gray-800">Under 10M</option>
                  <option value="10000000-50000000" className="bg-gray-800">10M - 50M</option>
                  <option value="50000000-100000000" className="bg-gray-800">50M - 100M</option>
                  <option value="100000000-1500000000" className="bg-gray-800">Over 100M</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => onFilterChange({})}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded-lg transition-colors"
              >
                Clear Filters
              </button>
              <span className="text-sm text-gray-400 flex items-center">
                Showing {filteredAndSortedCountries.length} of {countries.length} countries
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Countries Grid */}
      <motion.div 
        className="flex flex-wrap gap-2"
        variants={ANIMATION_VARIANTS.container}
        initial="hidden"
        animate="visible"
      >
        {filteredAndSortedCountries.map(country => {
          const isSelected = selectedCountries.some(c => c.code === country.code);
          return (
            <motion.button
              key={country.code}
              variants={ANIMATION_VARIANTS.item}
              onClick={() => isSelected ? onRemoveCountry(country.code) : onAddCountry(country)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                isSelected
                  ? 'bg-red-500/20 text-red-300 border border-red-500/30 scale-95'
                  : 'bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:scale-105'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg">{getFlagEmoji(country.code)}</span>
              <div className="text-left">
                <div className="text-sm font-medium">{country.name}</div>
                <div className="text-xs opacity-70">{country.city}</div>
              </div>
              <div className="text-xs opacity-60">
                {(country.population / 1000000).toFixed(1)}M
              </div>
              {isSelected ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </motion.button>
          );
        })}
      </motion.div>

      {filteredAndSortedCountries.length === 0 && (
        <div className="text-center py-8">
          <div className="text-gray-400 text-lg mb-2">No countries match your criteria</div>
          <div className="text-gray-500 text-sm">Try adjusting your search or filters</div>
        </div>
      )}
    </div>
  );
};

// Enhanced Weather Charts with multiple chart types
const ComprehensiveWeatherChart: React.FC<{
  type: 'temperature' | 'humidity' | 'pressure' | 'windSpeed' | 'precipitation';
  data: { [city: string]: ComprehensiveWeatherData };
  countries: Country[];
  chartType?: 'bar' | 'line' | 'area' | 'radar' | 'scatter';
  timeRange?: 'current' | 'hourly' | 'daily';
  showComparison?: boolean;
}> = ({ 
  type, 
  data, 
  countries, 
  chartType = 'bar', 
  timeRange = 'current',
  showComparison = false 
}) => {
  const [selectedMetric, setSelectedMetric] = useState(type);
  const [selectedTimeRange, setSelectedTimeRange] = useState(timeRange);

  const processChartData = () => {
    if (selectedTimeRange === 'current') {
      return countries.map((country, index) => ({
        name: country.name,
        city: country.city,
        value: data[country.city] ? data[country.city].current[selectedMetric] : 0,
        color: CHART_COLORS[index % CHART_COLORS.length],
        flag: getFlagEmoji(country.code)
      }));
    }

    if (selectedTimeRange === 'hourly') {
      // Aggregate hourly data for all countries
      const hourlyData: any[] = [];
      for (let i = 0; i < 24; i++) {
        const hourData: any = { hour: i };
        countries.forEach(country => {
          if (data[country.city] && data[country.city].forecast.hourly[i]) {
            hourData[country.name] = data[country.city].forecast.hourly[i][selectedMetric];
          }
        });
        hourlyData.push(hourData);
      }
      return hourlyData;
    }

    if (selectedTimeRange === 'daily') {
      // Aggregate daily data for all countries
      const dailyData: any[] = [];
      for (let i = 0; i < 7; i++) {
        const dayData: any = { day: i, dayName: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i] };
        countries.forEach(country => {
          if (data[country.city] && data[country.city].forecast.daily[i]) {
            dayData[country.name] = selectedMetric === 'temperature' 
              ? data[country.city].forecast.daily[i].avgTemp
              : data[country.city].forecast.daily[i][selectedMetric];
          }
        });
        dailyData.push(dayData);
      }
      return dailyData;
    }

    return [];
  };

  const chartData = processChartData();

  const renderChart = () => {
    const commonProps = {
      data: chartData,
      margin: { top: 20, right: 30, left: 20, bottom: 5 }
    };

    switch (chartType) {
      case 'line':
        return (
          <RechartsLineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey={selectedTimeRange === 'current' ? 'name' : selectedTimeRange === 'hourly' ? 'hour' : 'dayName'}
              tick={{ fill: 'white', fontSize: 12 }}
              angle={selectedTimeRange === 'current' ? -45 : 0}
              textAnchor={selectedTimeRange === 'current' ? 'end' : 'middle'}
              height={selectedTimeRange === 'current' ? 80 : 50}
            />
            <YAxis tick={{ fill: 'white' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(0,0,0,0.8)', 
                border: 'none',
                borderRadius: '8px',
                color: 'white'
              }}
            />
            {selectedTimeRange === 'current' ? (
              <Line 
                dataKey="value" 
                stroke="#8884d8"
                strokeWidth={3}
                dot={{ fill: '#8884d8', strokeWidth: 2, r: 6 }}
              />
            ) : (
              countries.map((country, index) => (
                <Line
                  key={country.code}
                  type="monotone"
                  dataKey={country.name}
                  stroke={CHART_COLORS[index % CHART_COLORS.length]}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              ))
            )}
            {selectedTimeRange !== 'current' && <Legend />}
          </RechartsLineChart>
        );

      case 'area':
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey={selectedTimeRange === 'current' ? 'name' : selectedTimeRange === 'hourly' ? 'hour' : 'dayName'}
              tick={{ fill: 'white', fontSize: 12 }}
              angle={selectedTimeRange === 'current' ? -45 : 0}
              textAnchor={selectedTimeRange === 'current' ? 'end' : 'middle'}
              height={selectedTimeRange === 'current' ? 80 : 50}
            />
            <YAxis tick={{ fill: 'white' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(0,0,0,0.8)', 
                border: 'none',
                borderRadius: '8px',
                color: 'white'
              }}
            />
            {selectedTimeRange === 'current' ? (
              <Area
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                fill="url(#colorGradient)"
                strokeWidth={2}
              />
            ) : (
              countries.map((country, index) => (
                <Area
                  key={country.code}
                  type="monotone"
                  dataKey={country.name}
                  stackId={showComparison ? "1" : undefined}
                  stroke={CHART_COLORS[index % CHART_COLORS.length]}
                  fill={CHART_COLORS[index % CHART_COLORS.length]}
                  fillOpacity={0.6}
                />
              ))
            )}
            {selectedTimeRange !== 'current' && <Legend />}
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
            </defs>
          </AreaChart>
        );

      case 'radar':
        if (selectedTimeRange !== 'current') return null;
        const radarData = countries.map(country => ({
          country: country.name,
          temperature: data[country.city]?.current.temperature || 0,
          humidity: data[country.city]?.current.humidity || 0,
          pressure: (data[country.city]?.current.pressure || 1000) - 950, // Normalize
          windSpeed: data[country.city]?.current.windSpeed || 0,
          visibility: data[country.city]?.current.visibility || 0
        }));

        return (
          <RadarChart {...commonProps} data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="country" tick={{ fill: 'white', fontSize: 10 }} />
            <PolarRadiusAxis tick={{ fill: 'white', fontSize: 8 }} />
            <Radar
              name="Temperature"
              dataKey="temperature"
              stroke="#ff6b6b"
              fill="#ff6b6b"
              fillOpacity={0.3}
            />
            <Radar
              name="Humidity"
              dataKey="humidity"
              stroke="#4ecdc4"
              fill="#4ecdc4"
              fillOpacity={0.3}
            />
            <Radar
              name="Wind Speed"
              dataKey="windSpeed"
              stroke="#45b7d1"
              fill="#45b7d1"
              fillOpacity={0.3}
            />
            <Legend />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(0,0,0,0.8)', 
                border: 'none',
                borderRadius: '8px',
                color: 'white'
              }}
            />
          </RadarChart>
        );

      case 'scatter':
        if (selectedTimeRange !== 'current') return null;
        const scatterData = countries.map(country => ({
          x: data[country.city]?.current.temperature || 0,
          y: data[country.city]?.current.humidity || 0,
          z: data[country.city]?.current.pressure || 1000,
          name: country.name
        }));

        return (
          <ScatterChart {...commonProps} data={scatterData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              type="number" 
              dataKey="x" 
              name="Temperature" 
              tick={{ fill: 'white' }}
              label={{ value: 'Temperature (°C)', position: 'insideBottom', offset: -5, fill: 'white' }}
            />
            <YAxis 
              type="number" 
              dataKey="y" 
              name="Humidity" 
              tick={{ fill: 'white' }}
              label={{ value: 'Humidity (%)', angle: -90, position: 'insideLeft', fill: 'white' }}
            />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }}
              contentStyle={{ 
                backgroundColor: 'rgba(0,0,0,0.8)', 
                border: 'none',
                borderRadius: '8px',
                color: 'white'
              }}
              formatter={(value, name) => [value, name === 'x' ? 'Temperature' : name === 'y' ? 'Humidity' : 'Pressure']}
            />
            <Scatter dataKey="z" fill="#8884d8" />
          </ScatterChart>
        );

      default:
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey={selectedTimeRange === 'current' ? 'name' : selectedTimeRange === 'hourly' ? 'hour' : 'dayName'}
              tick={{ fill: 'white', fontSize: 12 }}
              angle={selectedTimeRange === 'current' ? -45 : 0}
              textAnchor={selectedTimeRange === 'current' ? 'end' : 'middle'}
              height={selectedTimeRange === 'current' ? 80 : 50}
            />
            <YAxis tick={{ fill: 'white' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(0,0,0,0.8)', 
                border: 'none',
                borderRadius: '8px',
                color: 'white'
              }}
            />
            {selectedTimeRange === 'current' ? (
              <Bar 
                dataKey="value" 
                fill="#8884d8"
                radius={[4, 4, 0, 0]}
              />
            ) : (
              countries.map((country, index) => (
                <Bar
                  key={country.code}
                  dataKey={country.name}
                  fill={CHART_COLORS[index % CHART_COLORS.length]}
                  radius={[2, 2, 0, 0]}
                />
              ))
            )}
            {selectedTimeRange !== 'current' && <Legend />}
          </BarChart>
        );
    }
  };

  const getMetricUnit = (metric: string) => {
    switch (metric) {
      case 'temperature': return '°C';
      case 'humidity': return '%';
      case 'pressure': return 'hPa';
      case 'windSpeed': return 'km/h';
      case 'precipitation': return 'mm';
      default: return '';
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h3 className="text-xl font-semibold text-white capitalize">
            {selectedMetric.replace(/([A-Z])/g, ' $1').trim()} {getMetricUnit(selectedMetric)}
          </h3>
          <p className="text-sm text-gray-300">
            {selectedTimeRange === 'current' ? 'Current conditions' : 
             selectedTimeRange === 'hourly' ? '24-hour forecast' : '7-day forecast'}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {/* Metric Selector */}
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value as any)}
            className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="temperature" className="bg-gray-800">Temperature</option>
            <option value="humidity" className="bg-gray-800">Humidity</option>
            <option value="pressure" className="bg-gray-800">Pressure</option>
            <option value="windSpeed" className="bg-gray-800">Wind Speed</option>
            <option value="visibility" className="bg-gray-800">Visibility</option>
          </select>

          {/* Time Range Selector */}
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value as any)}
            className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="current" className="bg-gray-800">Current</option>
            <option value="hourly" className="bg-gray-800">24 Hours</option>
            <option value="daily" className="bg-gray-800">7 Days</option>
          </select>

          {/* Chart Type Selector */}
          <select
            value={chartType}
            onChange={(e) => {/* Chart type change handler */}}
            className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="bar" className="bg-gray-800">Bar Chart</option>
            <option value="line" className="bg-gray-800">Line Chart</option>
            <option value="area" className="bg-gray-800">Area Chart</option>
            {selectedTimeRange === 'current' && <option value="radar" className="bg-gray-800">Radar Chart</option>}
            {selectedTimeRange === 'current' && <option value="scatter" className="bg-gray-800">Scatter Plot</option>}
          </select>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>

      {/* Chart Statistics */}
      {selectedTimeRange === 'current' && chartData.length > 0 && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-xs text-gray-300 mb-1">Average</div>
            <div className="text-lg font-semibold text-white">
              {(chartData.reduce((sum, item) => sum + item.value, 0) / chartData.length).toFixed(1)} {getMetricUnit(selectedMetric)}
            </div>
          </div>
          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-xs text-gray-300 mb-1">Highest</div>
            <div className="text-lg font-semibold text-green-400">
              {Math.max(...chartData.map(item => item.value)).toFixed(1)} {getMetricUnit(selectedMetric)}
            </div>
          </div>
          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-xs text-gray-300 mb-1">Lowest</div>
            <div className="text-lg font-semibold text-blue-400">
              {Math.min(...chartData.map(item => item.value)).toFixed(1)} {getMetricUnit(selectedMetric)}
            </div>
          </div>
          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-xs text-gray-300 mb-1">Range</div>
            <div className="text-lg font-semibold text-purple-400">
              {(Math.max(...chartData.map(item => item.value)) - Math.min(...chartData.map(item => item.value))).toFixed(1)} {getMetricUnit(selectedMetric)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Advanced Settings Panel
const SettingsPanel: React.FC<{
  preferences: WeatherPreferences;
  onPreferencesChange: (preferences: WeatherPreferences) => void;
  isOpen: boolean;
  onClose: () => void;
}> = ({ preferences, onPreferencesChange, isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState<'general' | 'display' | 'data' | 'notifications'>('general');

  const updatePreference = (key: keyof WeatherPreferences, value: any) => {
    onPreferencesChange({
      ...preferences,
      [key]: value
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed right-0 top-0 h-full w-96 bg-white/10 backdrop-blur-lg border-l border-white/20 z-50 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Settings</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Section Navigation */}
              <div className="flex mb-6">
                {[
                  { key: 'general', label: 'General', icon: Settings },
                  { key: 'display', label: 'Display', icon: Monitor },
                  { key: 'data', label: 'Data', icon: Database },
                  { key: 'notifications', label: 'Alerts', icon: Bell }
                ].map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setActiveSection(key as any)}
                    className={`flex-1 flex flex-col items-center gap-1 p-3 rounded-lg transition-colors ${
                      activeSection === key ? 'bg-blue-500/20 text-blue-400' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-xs">{label}</span>
                  </button>
                ))}
              </div>

              {/* Settings Content */}
              <div className="space-y-6">
                {activeSection === 'general' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Temperature Unit</label>
                      <select
                        value={preferences.temperatureUnit}
                        onChange={(e) => updatePreference('temperatureUnit', e.target.value)}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="celsius" className="bg-gray-800">Celsius (°C)</option>
                        <option value="fahrenheit" className="bg-gray-800">Fahrenheit (°F)</option>
                        <option value="kelvin" className="bg-gray-800">Kelvin (K)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Wind Speed Unit</label>
                      <select
                        value={preferences.windSpeedUnit}
                        onChange={(e) => updatePreference('windSpeedUnit', e.target.value)}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="kmh" className="bg-gray-800">km/h</option>
                        <option value="mph" className="bg-gray-800">mph</option>
                        <option value="ms" className="bg-gray-800">m/s</option>
                        <option value="knots" className="bg-gray-800">knots</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Time Format</label>
                      <select
                        value={preferences.timeFormat}
                        onChange={(e) => updatePreference('timeFormat', e.target.value)}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="24h" className="bg-gray-800">24 Hour</option>
                        <option value="12h" className="bg-gray-800">12 Hour</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Date Format</label>
                      <select
                        value={preferences.dateFormat}
                        onChange={(e) => updatePreference('dateFormat', e.target.value)}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="dd/mm/yyyy" className="bg-gray-800">DD/MM/YYYY</option>
                        <option value="mm/dd/yyyy" className="bg-gray-800">MM/DD/YYYY</option>
                        <option value="yyyy-mm-dd" className="bg-gray-800">YYYY-MM-DD</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Language</label>
                      <select
                        value={preferences.language}
                        onChange={(e) => updatePreference('language', e.target.value)}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="en" className="bg-gray-800">English</option>
                        <option value="es" className="bg-gray-800">Español</option>
                        <option value="fr" className="bg-gray-800">Français</option>
                        <option value="de" className="bg-gray-800">Deutsch</option>
                        <option value="it" className="bg-gray-800">Italiano</option>
                        <option value="pt" className="bg-gray-800">Português</option>
                        <option value="ru" className="bg-gray-800">Русский</option>
                        <option value="ja" className="bg-gray-800">日本語</option>
                        <option value="ko" className="bg-gray-800">한국어</option>
                        <option value="zh" className="bg-gray-800">中文</option>
                      </select>
                    </div>
                  </motion.div>
                )}

                {activeSection === 'display' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Theme</label>
                      <select
                        value={preferences.theme}
                        onChange={(e) => updatePreference('theme', e.target.value)}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="dark" className="bg-gray-800">Dark</option>
                        <option value="light" className="bg-gray-800">Light</option>
                        <option value="auto" className="bg-gray-800">Auto</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Default View</label>
                      <select
                        value={preferences.defaultView}
                        onChange={(e) => updatePreference('defaultView', e.target.value)}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="grid" className="bg-gray-800">Grid View</option>
                        <option value="list" className="bg-gray-800">List View</option>
                        <option value="map" className="bg-gray-800">Map View</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Chart Type</label>
                      <select
                        value={preferences.chartType}
                        onChange={(e) => updatePreference('chartType', e.target.value)}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="line" className="bg-gray-800">Line Chart</option>
                        <option value="bar" className="bg-gray-800">Bar Chart</option>
                        <option value="area" className="bg-gray-800">Area Chart</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white">Animations</span>
                      <button
                        onClick={() => updatePreference('animations', !preferences.animations)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          preferences.animations ? 'bg-blue-600' : 'bg-gray-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            preferences.animations ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white">Sound Effects</span>
                      <button
                        onClick={() => updatePreference('sounds', !preferences.sounds)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          preferences.sounds ? 'bg-blue-600' : 'bg-gray-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            preferences.sounds ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </motion.div>
                )}

                {activeSection === 'data' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white">Auto Refresh</span>
                      <button
                        onClick={() => updatePreference('autoRefresh', !preferences.autoRefresh)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          preferences.autoRefresh ? 'bg-blue-600' : 'bg-gray-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            preferences.autoRefresh ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    {preferences.autoRefresh && (
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Refresh Interval (minutes)
                        </label>
                        <input
                          type="range"
                          min="1"
                          max="60"
                          value={preferences.refreshInterval}
                          onChange={(e) => updatePreference('refreshInterval', Number(e.target.value))}
                          className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>1min</span>
                          <span>{preferences.refreshInterval}min</span>
                          <span>60min</span>
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Forecast Days</label>
                      <input
                        type="range"
                        min="1"
                        max="14"
                        value={preferences.forecastDays}
                        onChange={(e) => updatePreference('forecastDays', Number(e.target.value))}
                        className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>1 day</span>
                        <span>{preferences.forecastDays} days</span>
                        <span>14 days</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Hourly Range (hours)</label>
                      <input
                        type="range"
                        min="6"
                        max="72"
                        step="6"
                        value={preferences.hourlyRange}
                        onChange={(e) => updatePreference('hourlyRange', Number(e.target.value))}
                        className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>6h</span>
                        <span>{preferences.hourlyRange}h</span>
                        <span>72h</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {[
                        { key: 'showForecast', label: 'Show Forecast' },
                        { key: 'showHourly', label: 'Show Hourly Data' },
                        { key: 'showAirQuality', label: 'Show Air Quality' },
                        { key: 'showUvIndex', label: 'Show UV Index' },
                        { key: 'showAstronomy', label: 'Show Astronomy Data' },
                        { key: 'showMarine', label: 'Show Marine Data' },
                        { key: 'showAgriculture', label: 'Show Agriculture Data' },
                        { key: 'showHealth', label: 'Show Health Metrics' },
                        { key: 'showEnergy', label: 'Show Energy Data' },
                        { key: 'showTransportation', label: 'Show Transportation' },
                        { key: 'showRecreation', label: 'Show Recreation Data' }
                      ].map(({ key, label }) => (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-sm font-medium text-white">{label}</span>
                          <button
                            onClick={() => updatePreference(key as keyof WeatherPreferences, !preferences[key as keyof WeatherPreferences])}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              preferences[key as keyof WeatherPreferences] ? 'bg-blue-600' : 'bg-gray-600'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                preferences[key as keyof WeatherPreferences] ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeSection === 'notifications' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white">Notifications</span>
                      <button
                        onClick={() => updatePreference('notifications', !preferences.notifications)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          preferences.notifications ? 'bg-blue-600' : 'bg-gray-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            preferences.notifications ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white">Show Alerts</span>
                      <button
                        onClick={() => updatePreference('showAlerts', !preferences.showAlerts)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          preferences.showAlerts ? 'bg-blue-600' : 'bg-gray-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            preferences.showAlerts ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    {preferences.showAlerts && (
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Alert Severity</label>
                        <div className="space-y-2">
                          {['minor', 'moderate', 'severe', 'extreme'].map(severity => (
                            <label key={severity} className="flex items-center">
                              <input
                                type="checkbox"
                                checked={preferences.alertSeverity.includes(severity)}
                                onChange={(e) => {
                                  const newSeverity = e.target.checked
                                    ? [...preferences.alertSeverity, severity]
                                    : preferences.alertSeverity.filter(s => s !== severity);
                                  updatePreference('alertSeverity', newSeverity);
                                }}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                              />
                              <span className="ml-2 text-sm text-white capitalize">{severity}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>

              {/* Reset Button */}
              <div className="mt-8 pt-6 border-t border-white/20">
                <button
                  onClick={() => {
                    const defaultPreferences: WeatherPreferences = {
                      temperatureUnit: 'celsius',
                      windSpeedUnit: 'kmh',
                      pressureUnit: 'hpa',
                      precipitationUnit: 'mm',
                      visibilityUnit: 'km',
                      timeFormat: '24h',
                      dateFormat: 'dd/mm/yyyy',
                      language: 'en',
                      theme: 'dark',
                      animations: true,
                      sounds: false,
                      notifications: true,
                      autoRefresh: true,
                      refreshInterval: 10,
                      defaultView: 'grid',
                      chartType: 'line',
                      showForecast: true,
                      forecastDays: 7,
                      showHourly: true,
                      hourlyRange: 24,
                      showAlerts: true,
                      alertSeverity: ['moderate', 'severe', 'extreme'],
                      showAirQuality: true,
                      showUvIndex: true,
                      showAstronomy: false,
                      showMarine: false,
                      showAgriculture: false,
                      showHealth: true,
                      showEnergy: false,
                      showTransportation: false,
                      showRecreation: true,
                      favoriteCities: [],
                      recentSearches: [],
                      bookmarks: [],
                      customLocations: []
                    };
                    onPreferencesChange(defaultPreferences);
                  }}
                  className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Reset to Defaults
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Main Weather Dashboard Component
const AdvancedWeatherDashboard: React.FC = () => {
  // State Management
  const [weatherData, setWeatherData] = useState<{ [city: string]: ComprehensiveWeatherData }>({});
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showSettings, setShowSettings] = useState(false);
  const [filters, setFilters] = useState<any>({});
  const [notifications, setNotifications] = useState<any[]>([]);
  const [preferences, setPreferences] = useState<WeatherPreferences>({
    temperatureUnit: 'celsius',
    windSpeedUnit: 'kmh',
    pressureUnit: 'hpa',
    precipitationUnit: 'mm',
    visibilityUnit: 'km',
    timeFormat: '24h',
    dateFormat: 'dd/mm/yyyy',
    language: 'en',
    theme: 'dark',
    animations: true,
    sounds: false,
    notifications: true,
    autoRefresh: true,
    refreshInterval: 10,
    defaultView: 'grid',
    chartType: 'line',
    showForecast: true,
    forecastDays: 7,
    showHourly: true,
    hourlyRange: 24,
    showAlerts: true,
    alertSeverity: ['moderate', 'severe', 'extreme'],
    showAirQuality: true,
    showUvIndex: true,
    showAstronomy: false,
    showMarine: false,
    showAgriculture: false,
    showHealth: true,
    showEnergy: false,
    showTransportation: false,
    showRecreation: true,
    favoriteCities: [],
    recentSearches: [],
    bookmarks: [],
    customLocations: []
  });

  // Services
  const weatherService = useMemo(() => new AdvancedWeatherService(), []);

  // Fetch weather data
  const fetchWeatherData = useCallback(async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await weatherService.getWeatherData(city);
      setWeatherData(prev => ({ ...prev, [city]: data }));
      
      // Add to recent searches
      setPreferences(prev => ({
        ...prev,
        recentSearches: [city, ...prev.recentSearches.filter(c => c !== city)].slice(0, 10)
      }));
      
    } catch (err) {
      setError(`Failed to fetch weather data for ${city}`);
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [weatherService]);

  // Add country
  const addCountry = useCallback((country: Country) => {
    if (selectedCountries.find(c => c.code === country.code)) return;
    
    setSelectedCountries(prev => [...prev, country]);
    fetchWeatherData(country.city);
    
    // Add notification
    setNotifications(prev => [...prev, {
      id: Date.now().toString(),
      type: 'success',
      title: 'Country Added',
      message: `${country.name} has been added to your dashboard`,
      timestamp: new Date(),
      read: false,
      actions: []
    }]);
  }, [selectedCountries, fetchWeatherData]);

  // Remove country
  const removeCountry = useCallback((countryCode: string) => {
    const country = selectedCountries.find(c => c.code === countryCode);
    setSelectedCountries(prev => prev.filter(c => c.code !== countryCode));
    
    if (country) {
      setNotifications(prev => [...prev, {
        id: Date.now().toString(),
        type: 'info',
        title: 'Country Removed',
        message: `${country.name} has been removed from your dashboard`,
        timestamp: new Date(),
        read: false,
        actions: []
      }]);
    }
  }, [selectedCountries]);

  // Load default countries on mount
  useEffect(() => {
    const defaultCountries = COMPREHENSIVE_COUNTRIES.slice(0, 6);
    defaultCountries.forEach(country => {
      addCountry(country);
    });
  }, []); // Empty dependency array to run only once

  // Auto refresh effect
  useEffect(() => {
    if (!preferences.autoRefresh) return;

    const interval = setInterval(() => {
      selectedCountries.forEach(country => {
        fetchWeatherData(country.city);
      });
    }, preferences.refreshInterval * 60 * 1000);

    return () => clearInterval(interval);
  }, [preferences.autoRefresh, preferences.refreshInterval, selectedCountries, fetchWeatherData]);

  // Filter countries based on search and filters
  const filteredCountries = useMemo(() => {
    return COMPREHENSIVE_COUNTRIES.filter(country => {
      const matchesSearch = country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           country.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           country.region.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRegion = !filters.region || country.region === filters.region;
      const matchesClimate = !filters.climateZone || country.climateZone === filters.climateZone;
      const matchesPopulation = !filters.population || 
        (country.population >= filters.population.min && country.population <= filters.population.max);

      return matchesSearch && matchesRegion && matchesClimate && matchesPopulation;
    });
  }, [searchTerm, filters]);

  // Error notification effect
  useEffect(() => {
    if (error) {
      setNotifications(prev => [...prev, {
        id: Date.now().toString(),
        type: 'error',
        title: 'Error',
        message: error,
        timestamp: new Date(),
        read: false,
        actions: [
          {
            label: 'Retry',
            handler: () => {
              selectedCountries.forEach(country => {
                fetchWeatherData(country.city);
              });
            }
          }
        ]
      }]);
      setError(null);
    }
  }, [error, selectedCountries, fetchWeatherData]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case 'r':
            event.preventDefault();
            selectedCountries.forEach(country => {
              fetchWeatherData(country.city);
            });
            break;
          case ',':
            event.preventDefault();
            setShowSettings(!showSettings);
            break;
          case 'g':
            event.preventDefault();
            setViewMode('grid');
            break;
          case 'l':
            event.preventDefault();
            setViewMode('list');
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCountries, fetchWeatherData, showSettings, viewMode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-30">
        <div className="container mx-auto px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between"
          >
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                🌍 Advanced Weather Dashboard
              </h1>
              <p className="text-gray-300 text-sm">
                Real-time weather data for {selectedCountries.length} locations • 
                Last updated: {formatTime(new Date(), preferences.timeFormat)}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full lg:w-auto">
              <AdvancedSearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search countries, cities, or regions..."
                suggestions={COMPREHENSIVE_COUNTRIES.map(c => `${c.name} (${c.city})`)}
                showHistory={true}
                history={preferences.recentSearches}
                className="flex-1 lg:w-80"
              />
              
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-lg transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white/20 text-white/80 hover:bg-white/30'
                  }`}
                  title="Grid View (Ctrl+G)"
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-lg transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white/20 text-white/80 hover:bg-white/30'
                  }`}
                  title="List View (Ctrl+L)"
                >
                  <List className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    selectedCountries.forEach(country => {
                      fetchWeatherData(country.city);
                    });
                  }}
                  disabled={loading}
                  className="p-3 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-400 transition-colors disabled:opacity-50"
                  title="Refresh All (Ctrl+R)"
                >
                  <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                </button>
                <button
                  onClick={() => setShowSettings(true)}
                  className="p-3 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors"
                  title="Settings (Ctrl+,)"
                >
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Notifications */}
      <AnimatePresence>
        {notifications.filter(n => !n.read).slice(0, 3).map(notification => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: -50, x: 300 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -50, x: 300 }}
            className="fixed top-20 right-4 z-40 bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-4 max-w-sm"
          >
            <div className="flex items-start gap-3">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                notification.type === 'success' ? 'bg-green-400' :
                notification.type === 'error' ? 'bg-red-400' :
                notification.type === 'warning' ? 'bg-yellow-400' :
                'bg-blue-400'
              }`} />
              <div className="flex-1">
                <div className="font-semibold text-white text-sm">{notification.title}</div>
                <div className="text-gray-300 text-xs mt-1">{notification.message}</div>
                {notification.actions.length > 0 && (
                  <div className="flex gap-2 mt-2">
                    {notification.actions.map((action, index) => (
                      <button
                        key={index}
                        onClick={action.handler}
                        className="text-xs bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-2 py-1 rounded transition-colors"
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={() => {
                  setNotifications(prev => prev.map(n => 
                    n.id === notification.id ? { ...n, read: true } : n
                  ));
                }}
                className="text-white/60 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Country Selector */}
      <div className="container mx-auto px-4 py-6">
        <AdvancedCountrySelector
          countries={filteredCountries}
          selectedCountries={selectedCountries}
          onAddCountry={addCountry}
          onRemoveCountry={removeCountry}
          searchTerm={searchTerm}
          filters={filters}
          onFilterChange={setFilters}
        />
      </div>

      {/* Weather Cards Grid */}
      <main className="container mx-auto px-4 pb-8">
        {loading && (
          <AdvancedLoadingSpinner
            size="large"
            type="spinner"
            message="Fetching weather data..."
          />
        )}
        
        <motion.div 
          className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1 max-w-6xl mx-auto'
          }`}
          variants={ANIMATION_VARIANTS.container}
          initial="hidden"
          animate="visible"
          layout
        >
          {selectedCountries.map((country) => (
            <DetailedWeatherCard
              key={country.code}
              country={country}
              weatherData={weatherData[country.city]}
              onRemove={() => removeCountry(country.code)}
              viewMode={viewMode}
              preferences={preferences}
            />
          ))}
        </motion.div>

        {selectedCountries.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Globe className="w-16 h-16 text-white/40 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-white mb-2">No Countries Selected</h3>
            <p className="text-gray-300 mb-6">Add some countries from the selector above to get started</p>
            <button
              onClick={() => {
                const randomCountries = COMPREHENSIVE_COUNTRIES
                  .sort(() => Math.random() - 0.5)
                  .slice(0, 4);
                randomCountries.forEach(addCountry);
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Add Random Countries
            </button>
          </motion.div>
        )}

        {/* Comparative Charts */}
        {selectedCountries.length > 1 && (
          <motion.div 
            className="mt-12 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                📊 Comparative Analysis
              </h2>
              <p className="text-gray-300">
                Compare weather conditions across {selectedCountries.length} locations
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ComprehensiveWeatherChart
                type="temperature"
                data={weatherData}
                countries={selectedCountries}
                chartType={preferences.chartType}
              />
              <ComprehensiveWeatherChart
                type="humidity"
                data={weatherData}
                countries={selectedCountries}
                chartType={preferences.chartType}
              />
              <ComprehensiveWeatherChart
                type="pressure"
                data={weatherData}
                countries={selectedCountries}
                chartType={preferences.chartType}
              />
              <ComprehensiveWeatherChart
                type="windSpeed"
                data={weatherData}
                countries={selectedCountries}
                chartType={preferences.chartType}
              />
            </div>

            {/* Hourly Forecast Chart */}
            {preferences.showHourly && (
              <div className="mt-8">
                <ComprehensiveWeatherChart
                  type="temperature"
                  data={weatherData}
                  countries={selectedCountries}
                  chartType="line"
                  timeRange="hourly"
                />
              </div>
            )}

            {/* Global Statistics */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-6">Global Weather Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {(() => {
                  const temps = selectedCountries
                    .map(c => weatherData[c.city]?.current.temperature)
                    .filter(Boolean) as number[];
                  const humidities = selectedCountries
                    .map(c => weatherData[c.city]?.current.humidity)
                    .filter(Boolean) as number[];
                  const pressures = selectedCountries
                    .map(c => weatherData[c.city]?.current.pressure)
                    .filter(Boolean) as number[];
                  const winds = selectedCountries
                    .map(c => weatherData[c.city]?.current.windSpeed)
                    .filter(Boolean) as number[];

                  return [
                    {
                      label: 'Average Temperature',
                      value: formatTemperature(temps.reduce((a, b) => a + b, 0) / temps.length, preferences.temperatureUnit),
                      icon: Thermometer,
                      color: 'text-red-400'
                    },
                    {
                      label: 'Average Humidity',
                      value: `${Math.round(humidities.reduce((a, b) => a + b, 0) / humidities.length)}%`,
                      icon: Droplets,
                      color: 'text-blue-400'
                    },
                    {
                      label: 'Average Pressure',
                      value: `${Math.round(pressures.reduce((a, b) => a + b, 0) / pressures.length)} hPa`,
                      icon: Gauge,
                      color: 'text-green-400'
                    },
                    {
                      label: 'Average Wind Speed',
                      value: `${Math.round(winds.reduce((a, b) => a + b, 0) / winds.length)} km/h`,
                      icon: Wind,
                      color: 'text-purple-400'
                    }
                  ].map(({ label, value, icon: Icon, color }) => (
                    <div key={label} className="text-center">
                      <Icon className={`w-8 h-8 ${color} mx-auto mb-2`} />
                      <div className="text-2xl font-bold text-white mb-1">{value}</div>
                      <div className="text-sm text-gray-300">{label}</div>
                    </div>
                  ));
                })()}
              </div>
            </div>
          </motion.div>
        )}
      </main>

      {/* Settings Panel */}
      <SettingsPanel
        preferences={preferences}
        onPreferencesChange={setPreferences}
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </div>
  );
};

export default AdvancedWeatherDashboard;