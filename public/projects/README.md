# Projects Images

This folder contains project images organized by category and project:

## Structure:
```
projects/
├── home/              # Residential projects
│   ├── bodrum/        # Bodrum Coastal Villa
│   ├── istanbul/      # Istanbul Residence
│   ├── ozak/          # Ozak Global Tower
│   └── zorlu/         # Zorlu Residence
│
├── hotels/            # Hospitality projects
│   ├── ela-hotel/     # Ela Quality Resort
│   ├── hostel/        # Hostel Boutique Hotel
│   └── mono-hotel/    # Mono Hotel
│
├── offices/           # Commercial/Office projects
│   ├── dia/           # Dia Office Complex
│   ├── dubai/         # Dubai Corporate Office
│   ├── macka/         # Macka Office Tower
│   └── schneider/     # Schneider Electric Office
│
└── restaurants/       # Restaurant projects
    ├── go-fungo/      # Go Fungo Restaurant
    └── kfc/           # KFC Restaurant Design
```

## Usage:
Images are referenced in the codebase using paths like:
- `/projects/hotels/hostel/Hostel_01.jpg`
- `/projects/home/bodrum/Bodrum_Home.jpg`
- `/projects/offices/dia/Dia-Office.jpg`

## Data Files:
Project data is maintained in:
- `src/lib/manualDemoData.ts` - Simple project list for grid
- `src/data/mockProjects.ts` - Detailed project data with metadata
