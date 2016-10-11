class Site < Carto
  COLUMNS = [:intname, :country, :hyperlink, :sitrecid, :site_id]

  attr_reader *COLUMNS

  def initialize(hsh)
    COLUMNS.each do |col|
      instance_variable_set("@#{col.to_s}", hsh[col.to_s])
    end
  end

  def self.for_species species
    parse(send_query(query_for_species_intersection(species)))
  end

  private

  def self.query_for_species_intersection species
    %Q(
      SELECT #{columns.join(", ")}
      FROM #{Species.table_name} as species, #{table_name} as sites
      WHERE species.ssid = #{species.ssid}
      AND ST_INTERSECTS(species.the_geom_webmercator, sites.the_geom_webmercator)
    )
  end

  def self.list_query
    %Q(
      SELECT DISTINCT #{columns.join(", ")}
      FROM #{table_name}
      WHERE intname IS NOT NULL
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
      WHERE sitrecid = #{id}
    )
  end

  def self.order_column
    "intname"
  end

  def self.table_name
    "critical_sites"
  end
end
