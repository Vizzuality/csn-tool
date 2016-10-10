class Carto
  include ActiveModel::Serialization

  alias :read_attribute_for_serialization :send

  class << self
    def model_name
      @_model_name ||= ActiveModel::Name.new(self)
    end

    def send_query query, get=true
      api_call = Cartowrap::API.new
      result = if get
                 api_call.send_query(query)
               else
                 api_call.post_query(query)
               end
      JSON.parse(result)
    end

    def all
      results = send_query(list_query)
      parse(results)
    end

    def where field, value
      results = send_query(where_query(field, value))
      parse(results)
    end

    private

    def list_query
      %Q(
      SELECT #{columns.join(", ")} FROM #{table_name}
      ORDER BY #{order_column}
      )
    end

    def filtered_query filters
      raise "Neets to be implemented"
    end

    def parse data
      return [] unless data["rows"]
      data["rows"].map do |row|
        self.new(row)
      end
    end

    def table_name
      self.to_s.downcase.pluralize
    end

    def columns
      self::COLUMNS.map(&:to_s)
    end

    def order_column
      "name"
    end

    def the_geom_val records=nil
      nil
    end
  end
end
