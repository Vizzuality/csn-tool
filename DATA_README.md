# Data Management

This files includes details on the data sources used by the CSN tool.


## Countries

The main table that holds country information is called **countries**. This is
linked to the **species** table through the **species_country** table that keeps
information about which species occur in which countries.

Country boundaries are obtained from the **world_borders** table.

The original countries table comes with some quirks that require manual adjustment
to work well:

### Russia

Russia comes split into three rows:

- Russia (Central Asian), country_id: 269
- Russia (Asian), country_id: 242
- Russia (European), country_id: 174

This separation doesn't exist on the **world_borders** table, so we need to
merge these three records in our dataset so that we can get Russia displayed
correctly in our _/countries_ index page.

To allow for that we created a new record with the following details:

```
{
  country: 'Russian Federation',
  country_id: 1000,
  iso3: 'RUS',
  iso2: 'RU',
  awea_member: false,
  aewa_region: null,
  ramsar_region: null,
  ramsar_member: false,
}
```

We then need to replace the occurrences of the three original country_ids
on the **species_country** table, with the _1000_ country_id. To keep the
historical information we kept the original information on a column named
_original_country_id_.

The same process is required for the **sites** table.
