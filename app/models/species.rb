class Species < Carto
  COLUMNS = [:scientificname, :red_list_status, :ssid, :commonname]

  attr_reader *COLUMNS

  def initialize(hsh)
    COLUMNS.each do |col|
      instance_variable_set("@#{col.to_s}", hsh[col.to_s])
    end
  end

  def self.for_site site
    parse(send_query(query_for_site_intersection(site)))
  end

  private

  def self.query_for_site_intersection site
    %Q(
      SELECT #{columns.join(", ")}
      FROM #{table_name} as species, #{Site.table_name} as sites
      WHERE sites.site_id = #{site.site_id}
      AND ST_INTERSECTS(species.the_geom_webmercator, sites.the_geom_webmercator)
    )
  end

  def self.list_query
    %Q(
      SELECT DISTINCT #{columns.join(", ")}
      FROM #{table_name}
      WHERE scientificname IS NOT NULL
      ORDER BY #{order_column}
    )
  end

  def self.where_query field, value
    %Q(
      SELECT DISTINCT #{columns.join(", ")}
      FROM #{table_name}
      WHERE #{field} ilike '#{value}%'
      ORDER BY #{order_column}
    )
  end

  def self.find_query id
    %Q(
      SELECT #{columns.join(", ")}
      FROM #{table_name}
      WHERE ssid = #{id}
    )
  end

  def self.order_column
    "scientificname"
  end

  def self.table_name
    "species_and_flywaygroups"
  end
end
