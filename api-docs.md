# Aetheria Forge API Documentation

Aetheria Forge provides a simple REST API to generate fantasy names programmatically. 

## Generate Names

Generate singular and plural fantasy names based on language preset profiles, with optional custom overrides for phonemes and emotional tone.

**Endpoint:** `POST /api/generate`

**Headers:**
- `Content-Type: application/json`

### Request Body

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `preset` | `string` | **Yes** | The ID of the language profile preset to use (`noble`, `cthulhu`, `shadow`, `barbar`, `mystic`). |
| `count` | `number` | No | Number of names to generate. Default is `5`. |
| `withMeaning` | `boolean` | No | Whether to include meanings for prefixes in the response. Default is `false`. |
| `override` | `object` | No | Deep-merge overrides for the language profile (tone, phonemes, etc.). |

#### Supported Presets (`preset` values)
- `noble`: Honored Kingdom (elegant, light)
- `cthulhu`: Elder Void (dark, harsh, madness)
- `shadow`: Shadow Dominion (stealthy, dark)
- `barbar`: War Clans (harsh, warrior)
- `mystic`: Hidden Order (secretive, elegant)

#### Override Object Structure
```json
"override": {
  "tone": {
    "harshness": 0.5,
    "darkness": 0.8,
    "elegance": 0.2
  },
  "phonemes": {
    "consonants": ["r", "th", "k"],
    "vowels": ["a", "u"]
  }
}
```

### Example Request

```json
POST /api/generate
Content-Type: application/json

{
  "preset": "shadow",
  "count": 3,
  "withMeaning": true,
  "override": {
    "tone": {
      "darkness": 1.0
    }
  }
}
```

### Example Response

```json
{
  "results": [
    {
      "singular": "Zarith",
      "plural": "Zarithes",
      "meaning": "poison-shadow"
    },
    {
      "singular": "Nekix",
      "plural": "Nekixes",
      "meaning": "shadow"
    },
    {
      "singular": "Silom",
      "plural": "Silomes",
      "meaning": "silence"
    }
  ]
}
```

### Error Responses

**400 Bad Request**
```json
{
  "error": "Preset is required"
}
```

**500 Internal Server Error**
```json
{
  "error": "Failed to generate names"
}
```
