# AI Thumbnail Savings Calculator

A clean green React web app for showing YouTube clients how much money they could save by switching from expensive traditional thumbnail design to a cheaper AI-assisted thumbnail service.

## What it calculates

Clients can enter:

- videos posted per week
- current cost per thumbnail
- AI-assisted thumbnail service cost
- extra monthly channel budget

The app then shows:

- current yearly thumbnail spend
- AI-assisted yearly thumbnail spend
- estimated yearly savings
- estimated 3-year savings
- a yearly cost comparison graph
- a 12-month savings graph
- reinvestment ideas for the saved money

## Example

If a creator normally pays `$30` per thumbnail and switches to `$10` AI-assisted thumbnails, they save `$20` every upload.

At 3 videos per week, that means:

```txt
3 videos/week × 52 weeks = 156 thumbnails/year
$20 saved per thumbnail × 156 thumbnails = $3,120 saved/year
```

## Run locally

```bash
cd ai-thumbnail-calculator
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Notes

The numbers are estimates. Real savings depend on upload volume, current design price, and the final agreed AI-assisted thumbnail price.
