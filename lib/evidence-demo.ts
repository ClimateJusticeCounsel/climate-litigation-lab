export type EvidenceRelation = {
  issue: string
  relation: 'supports' | 'challenges' | 'contextualizes' | 'gap'
  note: string
}

export type EvidenceItem = {
  id: string
  title: string
  kind: 'interview' | 'photo' | 'property' | 'local-law' | 'science' | 'expert' | 'damages' | 'map'
  status: 'private' | 'public-source'
  date: string
  location?: string
  sourceLabel: string
  sourceUrl?: string
  summary: string
  locator: string
  hash?: string
  relations: EvidenceRelation[]
  tags: string[]
}

export const evidenceIssues = [
  'Standing / legal interest',
  'Causation',
  'Customary land rights',
  'Physical loss',
  'Valuation / damages',
]

export const evidenceDemo: EvidenceItem[] = [
  {
    id: 'EV-001',
    title: 'Resident interview — shoreline retreat and customary use',
    kind: 'interview',
    status: 'private',
    date: '2027-02-14',
    location: 'Demo coastal community, Fiji',
    sourceLabel: 'Demo field interview for prototype',
    summary:
      'A demo resident interview describes a family home site, fishing access, burial grounds, and repeated inundation affecting how the land is used. It contains no real claimant information.',
    locator: 'Transcript 00:11:40–00:16:05',
    hash: '9f2de5c9d3aa6df9e6e452f11a2a43a4c227a1b50f7eaa906a2bb34a22b846d1',
    relations: [
      {
        issue: 'Customary land rights',
        relation: 'supports',
        note: 'Describes intergenerational use and cultural connection that would require corroboration under applicable local law.',
      },
      {
        issue: 'Physical loss',
        relation: 'supports',
        note: 'Identifies repeated inundation and reduced use of specific areas.',
      },
      {
        issue: 'Valuation / damages',
        relation: 'gap',
        note: 'Narrative identifies non-economic loss but does not quantify it.',
      },
    ],
    tags: ['field', 'testimony', 'customary use', 'inundation', 'demo'],
  },
  {
    id: 'EV-002',
    title: 'Shoreline condition photo set',
    kind: 'photo',
    status: 'private',
    date: '2027-02-14',
    location: 'Demo coastal community, Fiji',
    sourceLabel: 'Demo photo record for prototype',
    summary:
      'A demo photo set records erosion markers, a damaged seawall, and the distance between the current shoreline and a mapped former boundary.',
    locator: 'Images 02, 05, 07',
    hash: '62fa4e82c94f29c4f873f1650875932192150851ec3b6b1e4bc47d902afcf37d',
    relations: [
      {
        issue: 'Physical loss',
        relation: 'supports',
        note: 'Visual record can corroborate present physical conditions and identified structures.',
      },
      {
        issue: 'Causation',
        relation: 'gap',
        note: 'A photograph documents condition, not the climatic cause of that condition.',
      },
    ],
    tags: ['field', 'photo', 'erosion', 'property', 'demo'],
  },
  {
    id: 'EV-003',
    title: 'Parcel and occupancy record',
    kind: 'property',
    status: 'private',
    date: '2027-02-16',
    location: 'Demo coastal community, Fiji',
    sourceLabel: 'Demo property record for prototype',
    summary:
      'A demo parcel record shows how title, occupancy, customary interests, and mapped boundaries can be stored alongside other evidence.',
    locator: 'Parcel sheet, fields 3–9',
    hash: '1766a8513071a5599d671bb0df3425b2e21c077687338f0c2de3bfc679dd295d',
    relations: [
      {
        issue: 'Standing / legal interest',
        relation: 'supports',
        note: 'Provides a documentary basis for linking a claimant to the affected land, subject to verification of the governing tenure system.',
      },
      {
        issue: 'Customary land rights',
        relation: 'contextualizes',
        note: 'Shows why formal parcel records may need to be read together with customary-law evidence.',
      },
    ],
    tags: ['property', 'tenure', 'standing', 'demo'],
  },
  {
    id: 'EV-004',
    title: 'Local/customary law proof memo',
    kind: 'local-law',
    status: 'private',
    date: '2027-02-20',
    sourceLabel: 'Demo legal proof memo for prototype',
    summary:
      'A demo memorandum separates three questions: what the local rule is, how that rule is recognized by the domestic legal system, and what evidence is needed to establish that the claimant holds the asserted right.',
    locator: 'Sections 2.1–2.4',
    hash: '823830c57298025150376611966026fce7255413e6edac4f356bc00f66564f41',
    relations: [
      {
        issue: 'Customary land rights',
        relation: 'supports',
        note: 'Defines the legal proposition that field testimony and records must establish.',
      },
      {
        issue: 'Standing / legal interest',
        relation: 'supports',
        note: 'Connects the asserted customary interest to the legal test that a foreign forum may need to determine.',
      },
    ],
    tags: ['local law', 'customary law', 'proof', 'demo'],
  },
  {
    id: 'EV-005',
    title: 'Making Fiji Climate Resilient — Climate Vulnerability Assessment',
    kind: 'science',
    status: 'public-source',
    date: '2017-11-01',
    location: 'Fiji',
    sourceLabel: 'Government of Fiji / World Bank',
    sourceUrl:
      'https://documents1.worldbank.org/curated/en/163081509454340771/pdf/Climate-Vulnerability-Assessment-Making-Fiji-Climate-Resilient.pdf',
    summary:
      'Public national climate-risk assessment used here to demonstrate how authoritative background science and vulnerability evidence can sit alongside claimant-specific records.',
    locator: 'Public report — sea-level rise, coastal exposure and vulnerability sections',
    relations: [
      {
        issue: 'Causation',
        relation: 'contextualizes',
        note: 'Provides national-scale climate and exposure context; it does not by itself prove site-specific causation.',
      },
      {
        issue: 'Physical loss',
        relation: 'contextualizes',
        note: 'Helps frame the type of coastal risks against which site-specific evidence can be assessed.',
      },
    ],
    tags: ['public source', 'Fiji', 'climate risk', 'sea-level rise'],
  },
  {
    id: 'EV-006',
    title: 'IPCC SROCC Chapter 4 — Sea Level Rise',
    kind: 'science',
    status: 'public-source',
    date: '2019-09-25',
    sourceLabel: 'Intergovernmental Panel on Climate Change',
    sourceUrl:
      'https://www.ipcc.ch/srocc/chapter/chapter-4-sea-level-rise-and-implications-for-low-lying-islands-coasts-and-communities/',
    summary:
      'Public scientific assessment used to demonstrate a general-causation source: observed and projected sea-level rise, coastal flooding, erosion, and risks to low-lying islands and coasts.',
    locator: 'Chapter 4 — Executive Summary and Sections 4.2–4.3',
    relations: [
      {
        issue: 'Causation',
        relation: 'supports',
        note: 'Provides general scientific support for anthropogenic sea-level rise and associated coastal hazards.',
      },
      {
        issue: 'Physical loss',
        relation: 'contextualizes',
        note: 'Links sea-level rise with categories of coastal impact; site-specific attribution remains necessary.',
      },
    ],
    tags: ['public source', 'IPCC', 'causation', 'sea-level rise'],
  },
  {
    id: 'EV-007',
    title: 'Coastal engineer site assessment',
    kind: 'expert',
    status: 'private',
    date: '2027-03-04',
    location: 'Demo coastal community, Fiji',
    sourceLabel: 'Demo expert report for prototype',
    summary:
      'A demo engineering report compares historical shoreline positions, drainage, wave exposure, local interventions, and present damage to illustrate how expert evidence can both support and qualify a causal theory.',
    locator: 'Report pp. 18–31',
    hash: 'a0480a945bd6e746f6cd776fd82c32f95919b214314830df48d31bb39ab171cc',
    relations: [
      {
        issue: 'Causation',
        relation: 'supports',
        note: 'Attributes part of the observed change to higher baseline sea levels and wave exposure.',
      },
      {
        issue: 'Causation',
        relation: 'challenges',
        note: 'Also identifies drainage, shoreline engineering, and sediment change as contributing local factors.',
      },
    ],
    tags: ['expert', 'engineering', 'causation', 'contrary evidence', 'demo'],
  },
  {
    id: 'EV-008',
    title: 'Household loss and relocation worksheet',
    kind: 'damages',
    status: 'private',
    date: '2027-03-07',
    location: 'Demo coastal community, Fiji',
    sourceLabel: 'Demo damages worksheet for prototype',
    summary:
      'A demo worksheet separates repair costs, relocation expense, loss of use, lost income, and non-economic/cultural loss so that different valuation theories can be tested against the available proof.',
    locator: 'Worksheet tabs A–E',
    hash: '2f612ca33d508b43e1243889376e96e1be8ec98fb57866aa52aad4aa31d52178',
    relations: [
      {
        issue: 'Valuation / damages',
        relation: 'supports',
        note: 'Provides a structured starting point for claimed economic losses.',
      },
      {
        issue: 'Valuation / damages',
        relation: 'gap',
        note: 'Cultural and customary loss still requires an accepted methodology and corroborating evidence.',
      },
    ],
    tags: ['damages', 'valuation', 'relocation', 'demo'],
  },
  {
    id: 'EV-009',
    title: 'Community sketch map and use areas',
    kind: 'map',
    status: 'private',
    date: '2027-02-15',
    location: 'Demo coastal community, Fiji',
    sourceLabel: 'Demo participatory map for prototype',
    summary:
      'A demo participatory map identifies homes, fishing access, gathering areas, burial grounds, and locations residents describe as periodically inundated.',
    locator: 'Map layers 1–5',
    hash: '80cb288ad2900f9278455b371bf15bec8ceded936fdac6151e4890b5a967c8c3',
    relations: [
      {
        issue: 'Customary land rights',
        relation: 'supports',
        note: 'Spatializes claimed customary and cultural uses for later corroboration.',
      },
      {
        issue: 'Physical loss',
        relation: 'supports',
        note: 'Connects testimony about impact to identifiable places.',
      },
    ],
    tags: ['map', 'field', 'customary use', 'spatial evidence', 'demo'],
  },
  {
    id: 'EV-010',
    title: 'Missing evidence request — site-specific attribution',
    kind: 'expert',
    status: 'private',
    date: '2027-03-10',
    sourceLabel: 'Demo system-generated gap record',
    summary:
      'A demo gap item showing how CJC Lab can turn a weakness in the developing argument into a concrete field or expert-research request.',
    locator: 'Gap record GAP-03',
    relations: [
      {
        issue: 'Causation',
        relation: 'gap',
        note: 'Obtain analysis connecting observed parcel-level flooding/erosion to sea-level rise and separating local non-climate drivers.',
      },
    ],
    tags: ['gap', 'field request', 'causation', 'demo'],
  },
]
