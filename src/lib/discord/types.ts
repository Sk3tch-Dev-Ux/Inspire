// Minimal Discord interaction & embed types.
// We only model what the bot uses; not a full Discord API binding.

export const InteractionType = {
  PING: 1,
  APPLICATION_COMMAND: 2,
  MESSAGE_COMPONENT: 3,
  APPLICATION_COMMAND_AUTOCOMPLETE: 4,
  MODAL_SUBMIT: 5,
} as const;

export const InteractionResponseType = {
  PONG: 1,
  CHANNEL_MESSAGE_WITH_SOURCE: 4,
  DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE: 5,
  DEFERRED_UPDATE_MESSAGE: 6,
  UPDATE_MESSAGE: 7,
  APPLICATION_COMMAND_AUTOCOMPLETE_RESULT: 8,
  MODAL: 9,
} as const;

export const InteractionResponseFlags = {
  EPHEMERAL: 1 << 6,
} as const;

export const ApplicationCommandOptionType = {
  SUB_COMMAND: 1,
  SUB_COMMAND_GROUP: 2,
  STRING: 3,
  INTEGER: 4,
  BOOLEAN: 5,
  USER: 6,
  CHANNEL: 7,
  ROLE: 8,
  MENTIONABLE: 9,
  NUMBER: 10,
  ATTACHMENT: 11,
} as const;

export const ChannelType = {
  GUILD_TEXT: 0,
  GUILD_VOICE: 2,
  GUILD_CATEGORY: 4,
  GUILD_FORUM: 15,
} as const;

export type InteractionOption = {
  name: string;
  type: number;
  value?: string | number | boolean;
  options?: InteractionOption[];
};

export type Interaction = {
  id: string;
  application_id: string;
  type: number;
  token: string;
  version: number;
  guild_id?: string;
  channel_id?: string;
  member?: {
    user: { id: string; username: string; global_name?: string };
    roles: string[];
  };
  user?: { id: string; username: string; global_name?: string };
  data?: {
    id: string;
    name: string;
    options?: InteractionOption[];
    custom_id?: string;
    component_type?: number;
    components?: Array<{
      type: number;
      components: Array<{ custom_id: string; type: number; value?: string }>;
    }>;
  };
};

export type Embed = {
  title?: string;
  description?: string;
  url?: string;
  color?: number;
  fields?: Array<{ name: string; value: string; inline?: boolean }>;
  footer?: { text: string; icon_url?: string };
  timestamp?: string;
  thumbnail?: { url: string };
  image?: { url: string };
};

// Brand colors as Discord int values.
export const BrandColors = {
  flame: 0xff6b1a,
  flameGlow: 0xff8742,
  ember: 0xcc4a00,
  bone: 0xfafaf7,
  steel: 0x2d2d2d,
} as const;
